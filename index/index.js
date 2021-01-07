const app = getApp();

Page({
  data: {
    dateSelectorIcon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjEwMDIwNTMxMDAxIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1NDYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNDc5Ljg1NyA2MDguNDI5aDY0LjI4NmMxOS4yODYgMCAzMi4xNDMtMTIuODU4IDMyLjE0My0zMi4xNDNzLTEyLjg1Ny0zMi4xNDMtMzIuMTQzLTMyLjE0M2gtNjQuMjg2Yy0xOS4yODYgMC0zMi4xNDMgMTIuODU3LTMyLjE0MyAzMi4xNDNzMTIuODU3IDMyLjE0MyAzMi4xNDMgMzIuMTQzeiBtMCAxMjIuMTQyaDY0LjI4NmMxOS4yODYgMCAzMi4xNDMtMTIuODU3IDMyLjE0My0zMi4xNDJzLTEyLjg1Ny0zMi4xNDMtMzIuMTQzLTMyLjE0M2gtNjQuMjg2Yy0xOS4yODYgMC0zMi4xNDMgMTIuODU3LTMyLjE0MyAzMi4xNDNzMTIuODU3IDMyLjE0MiAzMi4xNDMgMzIuMTQyek04MzMuNDMgMTcxLjI4Nkg3MDQuODU3di0zMi4xNDNDNzA0Ljg1NyAxMTkuODU3IDY5MiAxMDcgNjcyLjcxNCAxMDdzLTMyLjE0MyAxMi44NTctMzIuMTQzIDMyLjE0M3YzMi4xNDNIMzgzLjQzdi0zMi4xNDNjMC0xOS4yODYtMTIuODU4LTMyLjE0My0zMi4xNDMtMzIuMTQzcy0zMi4xNDMgMTIuODU3LTMyLjE0MyAzMi4xNDN2MzIuMTQzSDE5MC41N0MxMTkuODU3IDE3MS4yODYgNjIgMjI5LjE0MyA2MiAyOTMuNDI5djUwMS40MjhDNjIgODY1LjU3MSAxMTkuODU3IDkyMy40MyAxOTAuNTcxIDkxN0g4MzMuNDNDOTA0LjE0MyA5MTcgOTYyIDg1OS4xNDMgOTYyIDc5NC44NTdWMjkzLjQzYzAtNzAuNzE1LTU3Ljg1Ny0xMjIuMTQzLTEyOC41NzEtMTIyLjE0M3ogbTY0LjI4NSA2MjMuNTcxYzAgMzIuMTQzLTMyLjE0MyA2NC4yODYtNjQuMjg1IDY0LjI4NkgxOTAuNTdjLTMyLjE0MiAwLTY0LjI4NS0yNS43MTQtNjQuMjg1LTY0LjI4NlY0MjJoNzcxLjQyOHYzNzIuODU3eiBtMC00MzcuMTQzSDEyNi4yODZWMjkzLjQzYzAtMzIuMTQzIDMyLjE0My02NC4yODYgNjQuMjg1LTY0LjI4NmgxMjguNTcydjMyLjE0M2MwIDE5LjI4NSAxMi44NTcgMzIuMTQzIDMyLjE0MyAzMi4xNDNzMzIuMTQzLTEyLjg1OCAzMi4xNDMtMzIuMTQzdi0zMi4xNDNINjQwLjU3djMyLjE0M2MwIDE5LjI4NSAxMi44NTggMzIuMTQzIDMyLjE0MyAzMi4xNDNzMzIuMTQzLTEyLjg1OCAzMi4xNDMtMzIuMTQzdi0zMi4xNDNIODMzLjQzYzMyLjE0MiAwIDY0LjI4NSAyNS43MTQgNjQuMjg1IDY0LjI4NnY2NC4yODV6TTI4NyA3MzAuNTcxaDY0LjI4NmMxOS4yODUgMCAzMi4xNDMtMTIuODU3IDMyLjE0My0zMi4xNDJzLTEyLjg1OC0zMi4xNDMtMzIuMTQzLTMyLjE0M0gyODdjLTE5LjI4NiAwLTMyLjE0MyAxMi44NTctMzIuMTQzIDMyLjE0M1MyNjcuNzE0IDczMC41NyAyODcgNzMwLjU3ek02NzIuNzE0IDYwOC40M0g3MzdjMTkuMjg2IDAgMzIuMTQzLTEyLjg1OCAzMi4xNDMtMzIuMTQzUzc1Ni4yODYgNTQ0LjE0MyA3MzcgNTQ0LjE0M2gtNjQuMjg2Yy0xOS4yODUgMC0zMi4xNDMgMTIuODU3LTMyLjE0MyAzMi4xNDNzMTIuODU4IDMyLjE0MyAzMi4xNDMgMzIuMTQzeiBtLTM4NS43MTQgMGg2NC4yODZjMTkuMjg1IDAgMzIuMTQzLTEyLjg1OCAzMi4xNDMtMzIuMTQzcy0xMi44NTgtMzIuMTQzLTMyLjE0My0zMi4xNDNIMjg3Yy0xOS4yODYgMC0zMi4xNDMgMTIuODU3LTMyLjE0MyAzMi4xNDNzMTIuODU3IDMyLjE0MyAzMi4xNDMgMzIuMTQzek02NzIuNzE0IDczMC41N0g3MzdjMTkuMjg2IDAgMzIuMTQzLTEyLjg1NyAzMi4xNDMtMzIuMTQyUzc1Ni4yODYgNjY2LjI4NiA3MzcgNjY2LjI4NmgtNjQuMjg2Yy0xOS4yODUgMC0zMi4xNDMgMTIuODU3LTMyLjE0MyAzMi4xNDNzMTIuODU4IDMyLjE0MiAzMi4xNDMgMzIuMTQyeiIgcC1pZD0iMjU0NyI+PC9wYXRoPjwvc3ZnPg==',
    dateTimeRange: [
      '2020-01-01 00:00:00',
      '2030-01-01 00:00:00'
    ],
    dateTime: ''
  },
  bindDateTimeChange: function (e) {
    this.setData({
      dateTime: e.detail.value
    });
  }
});