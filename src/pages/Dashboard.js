// src/pages/Dashboard.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { useTheme } from "@mui/material/styles";
import { getCampaignsData } from "../data/mockData";
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Skeleton,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import MetricCard from "../components/MetricCard";
import LineChart from "../components/charts/LineChart";
import BarChart from "../components/charts/BarChart";
import DonutChart from "../components/charts/DonutChart";
import AdvancedDataTable from "../components/AdvancedDataTable";

// Loading skeleton component
const LoadingSkeleton = () => (
  <Box sx={{ p: 3 }}>
    <Skeleton variant="text" width={200} height={40} />
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {[...Array(4)].map((_, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Skeleton variant="rounded" height={120} />
        </Grid>
      ))}
    </Grid>
    <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} variant="rounded" width="100%" height={350} />
      ))}
    </Box>
    <Skeleton variant="rounded" height={500} />
  </Box>
);

const Dashboard = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [updateInterval, setUpdateInterval] = useState(30); // seconds
  const [isLiveUpdating, setIsLiveUpdating] = useState(true);

  // Table pagination state
  const [page, setPage] = useState(0); // DataGrid is 0-based
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [campaignsData, setCampaignsData] = useState({
    campaigns: [],
    total: 0,
  });

  // Dummy overview and chart data
  const overviewData = {
    metrics: { revenue: 120000, users: 5400, conversions: 1200 },
    growth: { revenue: 8.2, users: 7.1, conversions: 5.4 },
  };
  const chartData = {
    lineChartData: [
      { date: new Date(), revenue: 10000, users: 500, conversions: 120 },
      { date: new Date(), revenue: 12000, users: 600, conversions: 140 },
      { date: new Date(), revenue: 15000, users: 700, conversions: 160 },
      { date: new Date(), revenue: 17000, users: 800, conversions: 180 },
      { date: new Date(), revenue: 20000, users: 900, conversions: 200 },
    ],
    barChartData: [
      {
        date: new Date(),
        campaigns: [
          { name: "Campaign 1", conversions: 100 },
          { name: "Campaign 2", conversions: 80 },
        ],
      },
      {
        date: new Date(),
        campaigns: [
          { name: "Campaign 1", conversions: 120 },
          { name: "Campaign 2", conversions: 90 },
        ],
      },
    ],
    pieChartData: [
      { channel: "social", value: 40 },
      { channel: "search", value: 30 },
      { channel: "email", value: 20 },
      { channel: "direct", value: 10 },
    ],
  };

  // Fetch campaigns data for table
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      // getCampaignsData expects 1-based page
      const data = getCampaignsData(page + 1, rowsPerPage);
      setCampaignsData(data);
      setLastUpdated(new Date());
      setLoading(false);
    }, 700);
  }, [page, rowsPerPage]);

  // Live update effect
  useEffect(() => {
    if (!isLiveUpdating) return;
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, updateInterval * 1000);
    return () => clearInterval(interval);
  }, [isLiveUpdating, updateInterval]);

  const handleExport = (type) => {
    alert(`Exporting as ${type.toUpperCase()}...`);
  };

  // Table pagination handlers
  const handleChangePage = (newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (newPageSize) => {
    setRowsPerPage(newPageSize);
    setPage(0);
  };

  if (loading) return <LoadingSkeleton />;

  return (
    <Box sx={{ p: 3 }}>
      {/* Dashboard Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          mb: 4,
          gap: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            ADmyBRAND Insights
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Analytics dashboard for digital marketing campaigns
          </Typography>
        </motion.div>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Live update controls */}
          <Card
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              px: 2,
              py: 1,
              borderRadius: 2,
              bgcolor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
              <FiberManualRecordIcon
                sx={{
                  fontSize: 10,
                  mr: 1,
                  color: isLiveUpdating ? "success.main" : "text.disabled",
                  animation: isLiveUpdating ? "pulse 2s infinite" : "none",
                  "@keyframes pulse": {
                    "0%": { opacity: 1 },
                    "50%": { opacity: 0.4 },
                    "100%": { opacity: 1 },
                  },
                }}
              />
              <Typography variant="caption" fontWeight="medium">
                {isLiveUpdating ? "Live" : "Paused"}
              </Typography>
            </Box>
            <IconButton
              size="small"
              onClick={() => setIsLiveUpdating((v) => !v)}
              color={isLiveUpdating ? "primary" : "default"}
              title={
                isLiveUpdating ? "Pause live updates" : "Start live updates"
              }
            >
              {isLiveUpdating ? (
                <PauseIcon fontSize="small" />
              ) : (
                <PlayArrowIcon fontSize="small" />
              )}
            </IconButton>
            <FormControl
              size="small"
              variant="standard"
              sx={{ ml: 1, minWidth: 70 }}
            >
              <Select
                value={updateInterval}
                onChange={(e) => setUpdateInterval(Number(e.target.value))}
                disableUnderline
                sx={{ fontSize: "0.75rem" }}
              >
                <MenuItem value={5}>5s</MenuItem>
                <MenuItem value={10}>10s</MenuItem>
                <MenuItem value={30}>30s</MenuItem>
                <MenuItem value={60}>1m</MenuItem>
              </Select>
            </FormControl>
          </Card>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Last updated: {format(lastUpdated, "h:mm:ss a")}
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              size="small"
              startIcon={<FileDownloadIcon />}
              onClick={() => handleExport("csv")}
              variant="outlined"
            >
              CSV
            </Button>
            <Button
              size="small"
              startIcon={<PictureAsPdfIcon />}
              onClick={() => handleExport("pdf")}
              variant="contained"
            >
              PDF
            </Button>
          </Box>
        </Box>
      </Box>
      {/* Mobile last updated time */}
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: { xs: "block", sm: "none" }, mb: 3 }}
      >
        Last updated: {format(lastUpdated, "h:mm:ss a")}
      </Typography>
      {/* Metrics Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Revenue"
            value={`$${overviewData.metrics.revenue.toLocaleString()}`}
            growth={overviewData.growth.revenue}
            icon="dollar-sign"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Users"
            value={overviewData.metrics.users.toLocaleString()}
            growth={overviewData.growth.users}
            icon="users"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Conversions"
            value={overviewData.metrics.conversions.toLocaleString()}
            growth={overviewData.growth.conversions}
            icon="shopping-cart"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Conversion Rate"
            value={`${(
              (overviewData.metrics.conversions / overviewData.metrics.users) *
              100
            ).toFixed(2)}%`}
            growth={overviewData.growth.conversions - overviewData.growth.users}
            icon="percent"
          />
        </Grid>
      </Grid>
      {/* Performance Overview - All charts in one row, scrollable on mobile */}
      <Card elevation={0} sx={{ borderRadius: 2, mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Performance Overview
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              overflowX: "auto",
              pb: 1,
              flexWrap: { xs: "nowrap", md: "nowrap" },
            }}
          >
            <Box sx={{ minWidth: 320, flex: "0 0 320px" }}>
              <LineChart
                data={chartData.lineChartData}
                title="Revenue & User Trends"
              />
            </Box>
            <Box sx={{ minWidth: 320, flex: "0 0 320px" }}>
              <BarChart
                data={chartData.barChartData}
                title="Campaign Performance"
              />
            </Box>
            <Box sx={{ minWidth: 320, flex: "0 0 320px" }}>
              <DonutChart
                data={chartData.pieChartData}
                title="Channel Distribution"
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Data Table with Pagination */}
      <Box sx={{ mb: 4 }}>
        <AdvancedDataTable
          data={campaignsData.campaigns}
          loading={loading}
          page={page}
          rowsPerPage={rowsPerPage}
          total={campaignsData.total}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card elevation={0} sx={{ borderRadius: 2 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <List sx={{ width: "100%" }}>
              {[
                {
                  avatar: "U",
                  color: theme.palette.primary.main,
                  message: "User count increased by 7%",
                  time: "2 hours ago",
                },
                {
                  avatar: "C",
                  color: theme.palette.secondary.main,
                  message: 'Campaign "Summer Sale" is performing well',
                  time: "5 hours ago",
                },
                {
                  avatar: "S",
                  color: theme.palette.success.main,
                  message: "New social media integration added",
                  time: "Yesterday at 2:30 PM",
                },
                {
                  avatar: "R",
                  color: theme.palette.warning.main,
                  message: "Revenue target reached for Q3",
                  time: "Yesterday at 10:15 AM",
                },
                {
                  avatar: "A",
                  color: theme.palette.error.main,
                  message: "Analytics report generated",
                  time: "2 days ago",
                },
              ].map((activity, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: activity.color }}>
                        {activity.avatar}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={activity.message}
                      secondary={
                        <Typography
                          sx={{ display: "block" }}
                          component="span"
                          variant="body2"
                          color="text.secondary"
                        >
                          {activity.time}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {index < 4 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Dashboard;
