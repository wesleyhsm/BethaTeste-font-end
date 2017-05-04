angular.module("listaProduto").factory("produtosAPI", function ($http, config) {
	var _getProdutos = function () {
		return $http.get(config.baseUrl + "/produto");
	};

	var _saveProduto = function (produto) {
		return $http.post(config.baseUrl + "/produto", produto);
	};

	return {
		getProdutos: _getProdutos,
		saveProdutos: _saveProduto
	};
});