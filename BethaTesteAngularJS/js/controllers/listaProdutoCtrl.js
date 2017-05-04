angular.module("listaProduto").controller("listaProdutoCtrl", function ($scope, produtosAPI, serialGenerator) {
	$scope.app = "Total";
	$scope.mycar = "Meu Carrinho";
	$scope.produtos = [];
	$scope.carrinhoProdutos = [];
	$scope.teste = false;
	
	var carregarProdutos = function () {
		produtosAPI.getProdutos().success(function (data) {
			data.forEach(function (item) {
				item.serial = serialGenerator.generate();
			});
			$scope.produtos = data;
		}).error(function (data, status) {
			$scope.message = "Aconteceu um problema: " + data;
		});
	};
		
	$scope.ordenarPor = function (campo) {
		$scope.criterioDeOrdenacao = campo;
		$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
	};
	
	var existeProduto = function(id){
		return $scope.carrinhoProdutos.filter(function(produto){
			return produto.id == id;
		});
	}
	
	$scope.alterarQuantidadeCarrinho = function (produto) {		
		console.log(produto);
	}
	
	$scope.adicionarProdutoCarrinho = function (produto) {		
		var existe = existeProduto(produto.id);
				
		if(existe.length > 0){
			existe[0].quantidade++;
		}else{
			$scope.carrinhoProdutos.push({
				"id": produto.id,
				"nome": produto.nome,
				"preco": produto.preco,			
				"quantidade": 1
			});
		}		
	};
	
	$scope.exibiQuantidadeCarrinho =  function(){
		var qtdTotal = 0;
		
		$scope.carrinhoProdutos.forEach(function(produto){
			qtdTotal += produto.quantidade;	
		});		
		
		return qtdTotal;
	}
	
	$scope.valorTotalCarrinho =  function(){
		var valorTotal = 0;
		
		$scope.carrinhoProdutos.forEach(function(produto){
			valorTotal += (produto.quantidade * produto.preco);	
		});		
		
		return valorTotal;
	}
	
	$scope.removerProdutoCarrinho = function(produto){
		$scope.carrinhoProdutos = $scope.carrinhoProdutos.filter(function(produto2){
			return produto2.id != produto.id;
		});
	}
		
	$scope.liberarCarrinho = function(){		
		if($scope.teste){
			$scope.teste = false;			
		}else{
			$scope.teste = true;
		}	
	}
		
	carregarProdutos();	
});