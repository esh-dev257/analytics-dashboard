// src/components/MetricCard.js
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PercentIcon from "@mui/icons-material/Percent";
import { alpha, useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";

const MetricCard = ({ title, value, growth, icon }) => {
  const theme = useTheme();
  const isPositive = growth >= 0;

  const getIcon = () => {
    switch (icon) {
      case "dollar-sign":
        return <AttachMoneyIcon />;
      case "users":
        return <PeopleIcon />;
      case "shopping-cart":
        return <ShoppingCartIcon />;
      case "percent":
        return <PercentIcon />;
      default:
        return <AttachMoneyIcon />;
    }
  };

  const getColor = () => {
    if (isPositive) {
      return {
        light: theme.palette.success.light,
        main: theme.palette.success.main,
        dark: theme.palette.success.dark,
      };
    } else {
      return {
        light: theme.palette.error.light,
        main: theme.palette.error.main,
        dark: theme.palette.error.dark,
      };
    }
  };

  const color = getColor();

  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        elevation={0}
        sx={{
          borderRadius: 2,
          height: "100%",
          background:
            theme.palette.mode === "dark"
              ? `linear-gradient(45deg, ${alpha(color.dark, 0.05)} 0%, ${alpha(
                  color.dark,
                  0.1
                )} 100%)`
              : `linear-gradient(45deg, ${alpha(color.light, 0.2)} 0%, ${alpha(
                  color.light,
                  0.4
                )} 100%)`,
          border: `1px solid ${alpha(
            color.main,
            theme.palette.mode === "dark" ? 0.1 : 0.2
          )}`,
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                {title}
              </Typography>
              <Typography variant="h4" component="div" fontWeight="bold">
                {value}
              </Typography>
            </Box>
            <Avatar
              sx={{
                bgcolor: alpha(
                  color.main,
                  theme.palette.mode === "dark" ? 0.2 : 0.1
                ),
                color: color.main,
              }}
            >
              {getIcon()}
            </Avatar>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Box
              component="span"
              sx={{
                display: "flex",
                alignItems: "center",
                color: color.main,
                fontWeight: "medium",
                fontSize: "0.875rem",
              }}
            >
              {isPositive ? (
                <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
              ) : (
                <TrendingDownIcon fontSize="small" sx={{ mr: 0.5 }} />
              )}
              {isPositive ? "+" : ""}
              {growth.toFixed(2)}%
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              vs last period
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MetricCard;
