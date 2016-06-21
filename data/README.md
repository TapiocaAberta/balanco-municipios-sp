Dados da Aplicação
--
Aqui estão os dados original da aplicação retirados do site do [TCE de São Paulo](http://transparencia.tce.sp.gov.br/):	
* [Receita dos municípios por impostos](http://transparencia.tce.sp.gov.br/receitas-resultantes-impostos)* [Receita dos municípios por origem](http://transparencia.tce.sp.gov.br/receitas-resultantes-impostos)* [Despesa dos municípios por função e subfunção](http://transparencia.tce.sp.gov.br/analises/despesa-funcao-subfuncao)

### Importante

* Ao baixar um arquivo, lembre-se de converter o encoding to arquivo. Para isso devemos achar o encoding com `file -bi arquivo` e em seguinda converter usando iconv. Aqui um exemplo com o arquivo de despesa: `iconv -f iso-8859-1 -t utf8 despesa-funcao-subfunc.csv > despesa-funcao-subfunc.csv.new`
