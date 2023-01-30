require(["./src.js"], function (src) {
  QUnit.module("Verificando se é ano bissexto");
  QUnit.test("é ano bissexto?", function (assert) {
    assert.equal(src.anoBissexto("2000"), true);
  });
  QUnit.test("é ano bissexto?", function (assert) {
    assert.equal(src.anoBissexto("2002"), false);
  });
  QUnit.test("é ano bissexto?", function (assert) {
    assert.equal(src.anoBissexto("1970"), false);
  });
  QUnit.test("é ano bissexto?", function (assert) {
    assert.equal(src.anoBissexto("2005"), false);
  });
  QUnit.test("é ano bissexto?", function (assert) {
    assert.equal(src.anoBissexto("2020"), true);
  });

  QUnit.module("Verifica dias do mês");
  QUnit.test("Retorna dias do mês se o ano é bissexto", function (assert) {
    assert.equal(src.getDiaMes(2000, 02), 29);
  });
  QUnit.test("Retorna dias do mês se o ano é bissexto", function (assert) {
    assert.equal(src.getDiaMes(2000, 05), 31);
  });
  QUnit.test("Retorna dias do mês se o ano é bissexto", function (assert) {
    assert.equal(src.getDiaMes(2004, 02), 29);
  });
  QUnit.test("Retorna dias do mês", function (assert) {
    assert.equal(src.getDiaMes(2020, 05), 31);
  });
  QUnit.test("Retorna dias do mês", function (assert) {
    assert.equal(src.getDiaMes(2002, 02), 28);
  });
  QUnit.test("Retorna dias do mês", function (assert) {
    assert.equal(src.getDiaMes(2010, 12), 31);
  });

  QUnit.module("Calcula a diferença de dias- teste principal");
  QUnit.test("Diferença de dias de anos diferentes", function (assert) {
    assert.equal(
      src.calculaDiasEntreDuasDatas("2021-06-15", "2023-05-25"),
      709
    );
  });
  QUnit.test("Diferença de dias de anos diferentes", function (assert) {
    assert.equal(
      src.calculaDiasEntreDuasDatas("2022-06-15", "2023-05-25"),
      344
    );
  });
  QUnit.test("Diferença de dias de anos diferentes", function (assert) {
    assert.equal(
      src.calculaDiasEntreDuasDatas("2019-02-10", "2022-03-20"),
      1134
    );
  });
  QUnit.test("Diferença de dias de anos diferentes", function (assert) {
    assert.equal(src.calculaDiasEntreDuasDatas("2022-10-11", "2023-01-10"), 91);
  });
  QUnit.test("Diferença de dias dentro do mesmo ano", function (assert) {
    assert.equal(src.calculaDiasEntreDuasDatas("2022-05-15", "2022-06-25"), 41);
  });

  QUnit.test(
    "Diferença de dias dentro do mesmo ano, com período de meses",
    function (assert) {
      assert.equal(
        src.calculaDiasEntreDuasDatas("2022-01-10", "2022-10-11"),
        274
      );
    }
  );
  QUnit.test(
    "Diferença de dias dentro do mesmo ano e mês, com período de dias",
    function (assert) {
      assert.equal(
        src.calculaDiasEntreDuasDatas("2022-01-10", "2022-01-20"),
        10
      );
    }
  );
  QUnit.test("Diferença de dias de meses subsequentes", function (assert) {
    assert.equal(src.calculaDiasEntreDuasDatas("2022-01-10", "2022-02-20"), 41);
  });
  QUnit.test(
    "Teste de diferença de dias de meses subsequentes, passando ano bissexto",
    function (assert) {
      assert.equal(
        src.calculaDiasEntreDuasDatas("2020-02-10", "2020-03-20"),
        39
      );
    }
  );
  QUnit.test(
    "Diferença de dias de meses subsequentes, passando ano bissexto",
    function (assert) {
      assert.equal(
        src.calculaDiasEntreDuasDatas("2020-02-10", "2022-03-20"),
        769
      );
    }
  );

  QUnit.test("Datas no mesmo mês - teste Charles", function (assert) {
    assert.equal(src.calculaDiasEntreDuasDatas("2023-01-26", "2023-01-27"), 1);
  });

  QUnit.test("Meses subsequentes - teste Charles", function (assert) {
    assert.equal(src.calculaDiasEntreDuasDatas("2023-01-26", "2023-02-20"), 25);
  });

  QUnit.test(
    "Fevereiro de ano não bissexto - teste Charles",
    function (assert) {
      assert.equal(
        src.calculaDiasEntreDuasDatas("2023-02-26", "2023-03-20"),
        22
      );
    }
  );

  QUnit.test("Fevereiro de ano bissexto - teste Charles", function (assert) {
    assert.equal(src.calculaDiasEntreDuasDatas("2024-02-26", "2024-03-20"), 23);
  });

  QUnit.test("Intervalo de meses - teste Charles", function (assert) {
    assert.equal(
      src.calculaDiasEntreDuasDatas("2023-03-01", "2023-09-20"),
      203
    );
  });

  QUnit.test(
    "Intervalos de meses em ano bissexto - teste Charles",
    function (assert) {
      assert.equal(
        src.calculaDiasEntreDuasDatas("2024-01-01", "2024-12-31"),
        365
      );
    }
  );

  QUnit.test("Ano subsequente- teste Charles", function (assert) {
    assert.equal(src.calculaDiasEntreDuasDatas("2023-12-15", "2024-01-15"), 31);
  });

  QUnit.test("Datas em anos diferentes - teste Charles", function (assert) {
    assert.equal(
      src.calculaDiasEntreDuasDatas("2020-08-30", "2024-01-15"),
      1233
    );
  });

  QUnit.test(
    "Anos diferentes, passando ano bissexto - teste Charles",
    function (assert) {
      assert.equal(
        src.calculaDiasEntreDuasDatas("2019-08-10", "2024-09-01"),
        1849
      );
    }
  );

  QUnit.test(
    "Quando a data final é menor que a inicial - teste Charles",
    function (assert) {
      assert.equal(
        src.calculaDiasEntreDuasDatas("2023-01-27", "1970-01-01"),
        19384
      );
    }
  );
  QUnit.test("Duas datas iguais resultam 0 - teste Charles", function (assert) {
    assert.equal(src.calculaDiasEntreDuasDatas("2023-01-26", "2023-01-26"), 0);
  });
});
