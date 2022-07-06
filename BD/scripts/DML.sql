
USE Processo_2RP;
GO

INSERT INTO TIPOUSUARIO(tituloTipoUsuario)
VALUES ('geral'), ('admin'), ('root');
GO


INSERT INTO USUARIO (idTipoUsuario, nome, email, senha, userStatus)
VALUES (1, 'UsuarioGeral', 'usuariogeral@email.com', '12345678', 1), (2, 'UsuarioAdmin', 'usuarioadmin@email.com', '12345678', 1), (3, 'UsuarioRoot', 'usuarioroot@email.com', '12345678', 1)