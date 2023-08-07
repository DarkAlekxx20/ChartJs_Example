package org.chjs.db;

/**
 *
 * @author pasit
 */
public class PruebaConexion {
    public static void main(String[] args) {
        ConexionMySQL connMySQL =new ConexionMySQL();
        try{
            connMySQL.open();
            System.out.println("Conexion establecida con MySQL");
            
            connMySQL.close();
            System.out.println("Se ha cerrado la conexion con MySQL");
        }catch(Exception e){
            e.printStackTrace();
        }
    }
}
