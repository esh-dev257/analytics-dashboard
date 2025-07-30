// src/components/charts/DonutChart.js
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ data, title }) => {
  const theme = useTheme();

  // Colors for different channels
  const channelColors = {
    social: theme.palette.primary.main,
    search: theme.palette.secondary.main,
    email: theme.palette.success.main,
    direct: theme.palette.warning.main,
    referral: theme.palette.error.main,
  };

  const chartData = {
    labels: data.map(
      (item) => item.channel.charAt(0).toUpperCase() + item.channel.slice(1)
    ),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: data.map((item) =>
          alpha(channelColors[item.channel] || theme.palette.grey[500], 0.8)
        ),
        borderWidth: 2,
        borderColor: theme.palette.background.paper,
        hoverBackgroundColor: data.map(
          (item) => channelColors[item.channel] || theme.palette.grey[500]
        ),
        hoverBorderColor: theme.palette.background.paper,
        hoverBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 10,
          usePointStyle: true,
          pointStyle: "circle",
          color: theme.palette.text.primary,
          font: {
            family: theme.typography.fontFamily,
            size: 12,
          },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: theme.palette.background.paper,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        bodyFont: {
          family: theme.typography.fontFamily,
        },
        titleFont: {
          family: theme.typography.fontFamily,
          weight: "bold",
        },
        callbacks: {
          label: function (context) {
            const total = context.dataset.data.reduce(
              (sum, value) => sum + value,
              0
            );
            const percentage = Math.round((context.raw / total) * 100);
            return `${context.label}: ${percentage}% (${context.raw})`;
          },
        },
      },
    },
    cutout: "70%",
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card elevation={0} sx={{ borderRadius: 2, height: "100%" }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            {title || "Channel Distribution"}
          </Typography>
          <Box
            sx={{
              height: 300,
              mt: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Doughnut data={chartData} options={options} />
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DonutChart;
