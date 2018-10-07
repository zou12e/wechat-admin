import http from '@common/http';

export function createCoin(form) {
  return http.post('/coin', form);
}

export function editCoin(form) {
  return http.put('/coin', form);
}

export function editCoinConfig(form) {
  return http.put('/coin/config', form);
}

export function getCoin(id) {
  return http.get(`/coin/${id}`);
}

export function getCoinAll(status = 1) {
  return http.get(`/coin_type/all?status=${status}`);
}

export function getCoinConfig(id) {
  return http.get(`/coin/config/${id}`);
}
