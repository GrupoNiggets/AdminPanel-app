import React from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Chip,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function UserTable({
  paginatedUsers,
  ROLE_COLORS,
  onEditRequest,
  currentPage,
  totalPages,
  filteredUserCount,
  handlePreviousPage,
  handleNextPage,
  usersPerPage,
}) {
  const emptyRows =
    paginatedUsers.length < usersPerPage
      ? usersPerPage - paginatedUsers.length
      : 0;

  return (
    <>
      <Box
        sx={{
          mb: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant="outlined"
          size="small"
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
        >
          Anterior
        </Button>
        <Typography variant="body2" color="text.secondary">
          Página {currentPage + 1} de {totalPages} ({filteredUserCount}{" "}
          usuarios)
        </Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={handleNextPage}
          disabled={currentPage >= totalPages - 1}
        >
          Siguiente
        </Button>
      </Box>

      <div className="table-wrapper">
        <table className="user-table">
          <thead className="table-head">
            <tr style={{ backgroundColor: "#f5f7ff" }}>
              <th>
                <strong>Usuario</strong>
              </th>
              <th>
                <strong>Email</strong>
              </th>
              <th>
                <strong>Rol</strong>
              </th>
              <th>
                <strong>Premium</strong>
              </th>
              <th style={{ textAlign: "center" }}>
                <strong>Acciones</strong>
              </th>
            </tr>
          </thead>
          <tbody className="table-body">
            {paginatedUsers.map((u) => (
              <tr key={u.id} className="table-row">
                <td>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar sx={{ bgcolor: "#0b5cff", width: 36, height: 36 }}>
                      {u.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography sx={{ fontWeight: 600 }}>{u.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        ID: {u.id}
                      </Typography>
                    </Box>
                  </Box>
                </td>
                <td>
                  <Typography color="text.secondary">{u.email}</Typography>
                </td>
                <td>
                  <Chip
                    label={u.role}
                    size="small"
                    sx={{
                      bgcolor: ROLE_COLORS[u.role] || ROLE_COLORS.default,
                      color: "#fff",
                      fontWeight: 600,
                    }}
                  />
                </td>
                <td>
                  <Chip
                    label={u.premium === "activo" ? "Activo" : "Inactivo"}
                    size="small"
                    color={u.premium === "activo" ? "success" : "default"}
                  />
                </td>
                <td style={{ textAlign: "center" }}>
                  <IconButton
                    name="Editar"
                    size="small"
                    color="primary"
                    onClick={() => onEditRequest(u)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton name="Borrar" size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton name="Perfil" size="small" color="disabled">
                    <AccountCircleIcon />
                  </IconButton>
                </td>
              </tr>
            ))}

            {emptyRows > 0 && (
              <tr
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <td colSpan="5" />
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserTable;
