import http from '@common/http';

export function postRolePrivileges(id, privilegeIds) {
  const data = {
    roleId: id,
    privilegeIds
  };
  return http.post('/v1/manage/admin/role/privilege/grant_privileges', data);
}

export function getRolePrivileges(id) {
  return http.get(`/v1/manage/admin/role/privilege/role_privileges`, {
    roleId: id
  });
}
