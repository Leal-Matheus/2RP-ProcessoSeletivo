USE Processo_2RP

SELECT * FROM USUARIO
SELECT * FROM TipoUsuario

SELECT nome,email,senha,userStatus,tituloTipoUsuario FROM USUARIO
INNER JOIN TipoUsuario
ON USUARIO.idTipoUsuario = TipoUsuario.idTipoUsuario