import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import "./SentimentComponent.css";
import { PieChart, Pie, Cell, Legend } from 'recharts';


const SentimentComponent = ({ question, sentimentData }) => {
    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ca8c94', '#f5b041', '#3498db'];

    const renderBarChart = () => {
        if (!sentimentData || !Array.isArray(sentimentData)) {
            return <p>No sentiment data available.</p>;
        }

        return (
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sentimentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="sentiment" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill={COLORS} />
                </BarChart>
            </ResponsiveContainer>
        );
    };

    const data = sentimentData.map(({ sentiment, value }) => {
        return { name: sentiment, value: value }
    });

    

    return (
        <div className="sentiment-component">
            <h4>{question}</h4>
            <div className="sentiment-component">
                {renderBarChart()}
            </div>
            <div class="center">



                <div>
                    <PieChart width={500} height={400}>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label
                        >
                            {
                                data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))
                            }
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>




            </div>


        </div>
    );
};

export default SentimentComponent;
