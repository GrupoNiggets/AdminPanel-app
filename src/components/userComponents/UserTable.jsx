import React from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Chip,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function UserTable({
  paginatedUsers,
  ROLE_COLORS,
  onEditRequest,
  onDeleteRequest,
  currentPage,
  totalPages,
  filteredUserCount,
  handlePreviousPage,
  handleNextPage,
  usersPerPage,
}) {
  const navigate = useNavigate();
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
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Página {currentPage + 1} de {totalPages} ({filteredUserCount}{" "}
          usuarios)
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
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
          <Button
            variant="outlined"
            size="small"
            onClick={handleNextPage}
            disabled={currentPage >= totalPages - 1}
          >
            Siguiente
          </Button>
        </Box>
      </Box>

      <div className="table-wrapper">
        <table className="user-table">
          <thead className="table-head">
            <tr style={{ backgroundColor: "#f5f7ff" }}>
              <th className="col-usuario">
                <strong>Usuario</strong>
              </th>
              <th className="col-email">
                <strong>Email</strong>
              </th>
              <th className="col-rol">
                <strong>Rol</strong>
              </th>
              <th className="col-premium">
                <strong>Premium</strong>
              </th>
              <th className="col-acciones" style={{ textAlign: "center" }}>
                <strong>Acciones</strong>
              </th>
            </tr>
          </thead>
          <tbody className="table-body">
            {paginatedUsers.map((u) => {
              const isPremium = Boolean(u.premium);
              return (
                <tr key={u.id} className="table-row">
                  <td className="col-usuario">
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
                  <td className="col-email">
                    <Typography color="text.secondary">{u.email}</Typography>
                  </td>
                  <td className="col-rol">
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
                  <td className="col-premium">
                    <Chip
                      label={isPremium ? "Activo" : "Inactivo"}
                      size="small"
                      color={isPremium ? "success" : "default"}
                    />
                  </td>
                  <td className="col-acciones" style={{ textAlign: "center" }}>
                    <IconButton
                      name="Editar"
                      size="small"
                      color="primary"
                      onClick={() => onEditRequest(u)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      name="Borrar"
                      size="small"
                      color="error"
                      onClick={() => onDeleteRequest(u)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      name="Perfil"
                      size="small"
                      color="primary"
                      onClick={() => {
                        navigate(`/users/${u.id}`);
                      }}
                    >
                      <AccountCircleIcon />
                    </IconButton>
                  </td>
                </tr>
              );
            })}

            {emptyRows > 0 && (
              <tr
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <td className="col-usuario" />
                <td className="col-email" />
                <td className="col-rol" />
                <td className="col-premium" />
                <td className="col-acciones" />
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserTable;
