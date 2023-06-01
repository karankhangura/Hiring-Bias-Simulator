import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import "./AdminPage.css";
import axios from "axios";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import SentimentComponent from "./SentimentComponent";


const AdminPage = () => {
    const [data, setData] = useState({});
    //const [chartType, setChartType] = useState("Video");
    const [chartType, setChartType] = useState("");

    const [feelingData, setFeelingData] = useState([]);
    const [overallData, setOverallData] = useState([]);
    const [influenceData, setInfluenceData] = useState([]);
    const [validData, setValidData] = useState([]);
    const [opinionData, setOpinionData] = useState([]);

    // useEffect(() => {
    useEffect(() => {
        const fetchData = async (type, url) => {
            try {
                const response = await axios.get(url);
                const jsonData = response.data;
                setData(jsonData);
                // setChartType(type);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const fetchSentimentData = async (type, url, setData) => {
            try {
                const response = await axios.get(url);
                const jsonData = response.data;
                if (jsonData && typeof jsonData === "object") {
                    const sentimentArray = Object.entries(jsonData).map(([key, value]) => ({
                        sentiment: key,
                        value: value,
                    }));
                    setData(sentimentArray);
                } else {
                    setData([]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }

        };


        switch (chartType) {
            case "Video":
                fetchData("Video", "https://wallflowerbackend.elcexercises.org/api/getvideochoices");
                console.log(data);

                break;
            case "Application":
                fetchData("Application", "https://wallflowerbackend.elcexercises.org/api/getapplicationchoices");
                console.log(data);

                break;
            case "Final":
                fetchData("Final", "https://wallflowerbackend.elcexercises.org/api/getpreferredchoices");
                console.log(data);

                break;
            case "Sentiment":
                fetchSentimentData("Feeling", "https://wallflowerbackend.elcexercises.org/api/getfeeling", setFeelingData);
                fetchSentimentData("Overall", "https://wallflowerbackend.elcexercises.org/api/getoverall", setOverallData);
                fetchSentimentData("Influence", "https://wallflowerbackend.elcexercises.org/api/getinfluence", setInfluenceData);
                fetchSentimentData("Valid", "https://wallflowerbackend.elcexercises.org/api/getvalid", setValidData);
                fetchSentimentData("Submit", "https://wallflowerbackend.elcexercises.org/api/getopinion", setOpinionData);
                break;
            default:
                break;
        }

    }, [chartType, data]);

    const questions = [
        "How did you feel when your candidate was rejected?",
        "I found the overall hiring process to be:",
        "In your view, which one of the following factors most heavily influenced the company’s decision in not hiring the candidate that you selected?",
        "Did Marco (The Co-Founder) make valid arguments to support the hiring decision?",
        "Did Marco’s hiring decision influence your opinion of the company?",
    ];

    const exportDataToExcel = async () => {
        const apiUrls = {
            video: 'https://wallflowerbackend.elcexercises.org/api/getvideochoices',
            application: 'https://wallflowerbackend.elcexercises.org/api/getapplicationchoices',
            final: 'https://wallflowerbackend.elcexercises.org/api/getpreferredchoices',
            feeling: 'https://wallflowerbackend.elcexercises.org/api/getfeeling',
            overall: 'https://wallflowerbackend.elcexercises.org/api/getoverall',
            influence: 'https://wallflowerbackend.elcexercises.org/api/getinfluence',
            valid: 'https://wallflowerbackend.elcexercises.org/api/getvalid',
            opinion: 'https://wallflowerbackend.elcexercises.org/api/getopinion',
        };

        const fetchData = async (url) => {
            try {
                const response = await axios.get(url);
                return response.data;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const data = {
            video: await fetchData(apiUrls.video),
            application: await fetchData(apiUrls.application),
            final: await fetchData(apiUrls.final),
            feeling: await fetchData(apiUrls.feeling),
            overall: await fetchData(apiUrls.overall),
            influence: await fetchData(apiUrls.influence),
            valid: await fetchData(apiUrls.valid),
            opinion: await fetchData(apiUrls.opinion),
        };

        const workbook = XLSX.utils.book_new();

        const keys = Object.keys(data);

        for (const sheetName in data) {
            let sheetData = data[sheetName];

            if (typeof sheetData === "object" && !Array.isArray(sheetData)) {
                const questionRow = { Q: questions[keys.indexOf(sheetName) - 3] };
                sheetData = [questionRow].concat(
                    Object.entries(sheetData).map(([key, value]) => ({
                        sentiment: key,
                        value: value,
                    }))
                );
            }



            const worksheet = XLSX.utils.json_to_sheet(sheetData);
            XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        }

        const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
        const buffer = new ArrayBuffer(wbout.length);
        const view = new Uint8Array(buffer);
        for (let i = 0; i < wbout.length; i++) {
            view[i] = wbout.charCodeAt(i) & 0xFF;
        }
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `wallflower-output-${formattedDate}.xlsx`);
    };



    const renderChart = () => {
        if (!data) {
            return <p>Loading data...</p>;
        }

        // need a switch case to handle the different types of choices
        // Video and Application choice 
        switch (chartType) {
            case "Video":
                // fetchData("Video", "http://localhost:8080/api/getvideochoices");
                return (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="topchoice" fill="#8884d8" />
                            <Bar dataKey="bottomchoice" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                )
            case "Application":
                return (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="topchoice" fill="#8884d8" />
                            <Bar dataKey="bottomchoice" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                );
            // Final choice
            case "Final":
                return (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="topchoice" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                );
            case "Sentiment":


                return (
                    <div>
                        <h1>Additional Responses</h1>
                        <h2>Feeling Data</h2>
                        <SentimentComponent
                            key={0}
                            question={questions[0]}
                            sentimentData={feelingData}
                        />
                        <hr></hr>

                        <h2>Overall Data</h2>
                        <SentimentComponent
                            key={1}
                            question={questions[1]}
                            sentimentData={overallData}
                        />
                        <hr></hr>

                        <h2>Influence Data</h2>
                        <SentimentComponent
                            key={2}
                            question={questions[2]}
                            sentimentData={influenceData}
                        />
                        <hr></hr>

                        <h2>Marco's Argument</h2>
                        <SentimentComponent
                            key={3}
                            question={questions[3]}
                            sentimentData={validData}
                        />
                        <hr></hr>
                        <h2>Marco's Hiring Decision</h2>
                        <SentimentComponent
                            key={4}
                            question={questions[4]}
                            sentimentData={opinionData}
                        />
                    </div>
                );

            default:
                return <p>Select a chart</p>;
        };
    };

    const clearData = () => {
        axios.get('https://wallflowerbackend.elcexercises.org/api/clearapplicationchoices')
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            })
        axios.get('https://wallflowerbackend.elcexercises.org/api/clearvideochoices')
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            })
        axios.get('https://wallflowerbackend.elcexercises.org/api/clearpreferredchoices')
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            })
    }


    return (
        <div className="admin-page">
            <div className="button-container">
                <Button onClick={() => setChartType("Application")}>Application/Resume Choice</Button>
                <Button onClick={() => setChartType("Video")}>Video Choice</Button>
                <Button onClick={() => setChartType("Final")}>Final Choice</Button>
                <Button onClick={() => setChartType("Sentiment")}>Sentiment Data</Button>

                <Button onClick={exportDataToExcel}>Save Data</Button>

                <Button onClick={() => clearData()} > Clear </Button>

            </div>
            <div className="chart-container">{renderChart()}</div>
        </div>
    );
};

export default AdminPage;