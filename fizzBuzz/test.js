require(["./src.js"], function (src) {
  QUnit.module("Verificando se é ano bissexto");
  QUnit.test("é ano bissexto?", function (assert) {
    assert.equal(src.retornaNumerosLista(1), 1);
  });
});
