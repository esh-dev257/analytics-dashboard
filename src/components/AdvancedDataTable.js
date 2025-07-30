import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme, useMediaQuery } from "@mui/material";

const AdvancedDataTable = ({
  data,
  loading,
  page,
  rowsPerPage,
  total,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Responsive columns configuration
  const columns = [
    {
      field: "name",
      headerName: "Campaign",
      flex: 1,
      minWidth: 120,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "spend",
      headerName: "Spend",
      width: isMobile ? 80 : 100,
      headerAlign: isMobile ? "right" : "left",
      align: isMobile ? "right" : "left",
      valueFormatter: (params) =>
        params.value != null ? `$${params.value.toLocaleString()}` : "",
    },
    {
      field: "ctr",
      headerName: "CTR",
      width: isMobile ? 70 : 90,
      headerAlign: isMobile ? "right" : "left",
      align: isMobile ? "right" : "left",
      valueFormatter: (params) =>
        params.value != null ? `${params.value.toFixed(2)}%` : "",
    },
    {
      field: "cpc",
      headerName: "CPC",
      width: isMobile ? 70 : 90,
      headerAlign: isMobile ? "right" : "left",
      align: isMobile ? "right" : "left",
      valueFormatter: (params) =>
        params.value != null ? `$${params.value.toFixed(2)}` : "",
    },
  ];

  return (
    <div style={{ width: "100%", height: isMobile ? 350 : 400 }}>
      <DataGrid
        rows={data}
        columns={columns}
        page={page}
        pageSize={rowsPerPage}
        rowCount={total}
        pagination
        paginationMode="server"
        onPageChange={onPageChange}
        onPageSizeChange={onRowsPerPageChange}
        rowsPerPageOptions={[10]}
        loading={loading}
        disableSelectionOnClick
        sx={{
          border: 0,
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor:
              theme.palette.mode === "dark"
                ? theme.palette.background.default
                : theme.palette.grey[100],
            borderRadius: 1,
          },
          "& .MuiDataGrid-cell": {
            fontSize: isMobile ? "0.75rem" : "0.875rem",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontSize: isMobile ? "0.75rem" : "0.875rem",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-toolbarContainer": {
            padding: isMobile ? 0.5 : 1,
          },
          "& .MuiTablePagination-root": {
            fontSize: isMobile ? "0.75rem" : "0.875rem",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: `1px solid ${theme.palette.divider}`,
          },
        }}
      />
    </div>
  );
};

export default AdvancedDataTable;
