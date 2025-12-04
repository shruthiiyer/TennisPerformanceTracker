import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Match } from '../types';
import { format } from 'date-fns';

interface TrendsChartProps {
  matches: Match[];
}

const getResultValue = (result: string): number => {
  switch (result) {
    case 'win':
      return 1;
    case 'loss':
      return -1;
    case 'split sets':
      return 0;
    default:
      return 0;
  }
};

export const TrendsChart = ({ matches }: TrendsChartProps) => {
  if (matches.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Match Trends (Last 5 Matches)</h2>
        <p className="text-gray-500 text-center py-8">No matches available to display</p>
      </div>
    );
  }

  const chartData = matches.slice(0, 5).reverse().map((match) => ({
    date: format(new Date(match.date), 'MMM dd'),
    result: getResultValue(match.result),
    match: `${match.opponentName} (${match.result})`,
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Match Trends (Last 5 Matches)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis 
            domain={[-1.5, 1.5]}
            ticks={[-1, 0, 1]}
            tickFormatter={(value) => {
              if (value === 1) return 'Win';
              if (value === -1) return 'Loss';
              return 'Split';
            }}
          />
          <Tooltip 
            formatter={(value: number) => {
              if (value === 1) return 'Win';
              if (value === -1) return 'Loss';
              return 'Split Sets';
            }}
            labelFormatter={(label, payload) => {
              if (payload && payload[0]) {
                return payload[0].payload.match;
              }
              return label;
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="result" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={{ r: 6 }}
            name="Result"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

