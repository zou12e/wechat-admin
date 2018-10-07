import create from '@common/create';
import Menu from './auth/menu';
import Action from './auth/action';
import Role from './auth/role';
import Employee from './auth/employee';
import SystemLog from './log';
import RoleConfig from './auth/role-config';
import Parameter from './parameter';
import Coin from './coin';

export default {
  routes: [
    {
      path: '/system/auth/menu',
      name: 'system-auth-menu',
      component: create(Menu),
      meta: {
        name: '菜单管理'
      }
    },
    {
      path: '/system/auth/action',
      name: 'system-auth-action',
      component: create(Action),
      meta: {
        name: '功能权限配置'
      }
    },
    {
      path: '/system/auth/role',
      name: 'system-auth-role',
      component: create(Role),
      meta: {
        name: '角色管理'
      }
    },
    {
      path: '/system/auth/role/config',
      name: 'system-auth-role-config',
      component: RoleConfig,
      meta: {
        name: '角色管理',
        path: '/system/auth/role'
      }
    },
    {
      path: '/system/auth/employee',
      name: 'system-auth-employee',
      component: create(Employee),
      meta: {
        name: '员工管理'
      }
    },
    {
      path: '/system/log',
      name: 'system-log',
      component: create(SystemLog),
      meta: {
        name: '系统日志'
      }
    },
    {
      path: '/system/parameter',
      name: 'system-parameter',
      component: create(Parameter),
      meta: {
        name: '系统参数配置'
      }
    },
    {
      path: '/system/coin',
      name: 'system-coin',
      component: create(Coin),
      meta: {
        name: '基础币种配置'
      }
    }
  ]
};
