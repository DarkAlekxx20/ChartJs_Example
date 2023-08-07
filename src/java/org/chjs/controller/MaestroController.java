package org.chjs.controller;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import org.chjs.db.ConexionMySQL;
import org.chjs.model.Maestro;

/**
 * @author Alex SP
 */
public class MaestroController {
 public int save (Maestro m) throws Exception{
        int resultado = 0;
        String sql = "{call insertarMaestro (?, ? , ? , ? , ? , ? , ? , ? , ?)}";
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();
        PreparedStatement pstmt = conn.prepareCall(sql);
          pstmt.setString(1,m.getNombre());
          pstmt.setString(2,m.getApePaterno());
          pstmt.setString(3,m.getApeMaterno());
          pstmt.setString(4,m.getMatricula());
          pstmt.setString(5,m.getArea());
          pstmt.setString(6,m.getUsuario().getNombreUsuario());
          pstmt.setString(7,m.getUsuario().getContrasenia());
          pstmt.setString(8,m.getUsuario().getRol());
          pstmt.setString(9,m.getUsuario().getCorreo());  
          pstmt.executeUpdate();
          pstmt.close();
          connMySQL.close();
          return resultado;
        }

    public List<Maestro> getAll(String filtro) throws Exception{
        String sql = "SELECT * FROM maestro;";
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();
        PreparedStatement pstmt = conn.prepareCall(sql);
        ResultSet rs = pstmt.executeQuery();
        List<Maestro> maestros = new ArrayList<>();
        while(rs.next()){
            maestros.add(fill(rs));
        }
        rs.close();
        pstmt.close();
        connMySQL.close();
        return maestros;
    }

    private Maestro fill(ResultSet rs) throws Exception{
        Maestro m = new Maestro();
        m.setIdMaestro(rs.getInt("idMaestro"));
        m.setNombre(rs.getString("nombreMaestro"));
        m.setApePaterno(rs.getString("primerApe"));
        m.setApeMaterno(rs.getString("segundoApe"));
        m.setArea(rs.getString("area"));
        m.setMatricula(rs.getString("matricula"));
        return m;
    }
}