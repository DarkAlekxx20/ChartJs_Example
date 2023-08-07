package org.chjs.db;
import java.sql.Connection;
import java.sql.DriverManager;
/**
 * @author Alex SP
 */
public class ConexionMySQL {
    Connection conn;
    public Connection open(){
        String user = "root";
        String password = ",Enero2003";
        String url = "jdbc:mysql://Localhost:3306/powerBI?useSSL=false&"
        +"allowPublicKeyRetrieval=true&"+
        "useUnicode=true&characterEncoding=utf-8";
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(url, user, password);
            return conn;
        } catch (Exception e) {
        throw new RuntimeException(e);
        }
    }

    public void close(){
        if(conn != null){
            try {
                conn.close();
            } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Se cerro la conexion de manera exitosa!");
            }
        }
    }
}