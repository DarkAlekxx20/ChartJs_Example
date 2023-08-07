package org.chjs.model;
/**
 * @author nikob
 */
public class Maestro {
    private int idMaestro;
    private String nombre;
    private String apePaterno;
    private String apeMaterno;
    private String matricula;
    private String area;
    private Usuario usuario;

    public Maestro(){}

    public Maestro(int idMaestro, String nombre, String apePaterno, String apeMaterno, String matricula, String area, Usuario usuario) {
        this.idMaestro = idMaestro;
        this.nombre = nombre;
        this.apePaterno = apePaterno;
        this.apeMaterno = apeMaterno;
        this.matricula = matricula;
        this.area = area;
        this.usuario = usuario;
    }

    public int getIdMaestro() {
        return idMaestro;
    }

    public void setIdMaestro(int idMaestro) {
        this.idMaestro = idMaestro;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApePaterno() {
        return apePaterno;
    }

    public void setApePaterno(String apePaterno) {
        this.apePaterno = apePaterno;
    }

    public String getApeMaterno() {
        return apeMaterno;
    }

    public void setApeMaterno(String apeMaterno) {
        this.apeMaterno = apeMaterno;
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    @Override
    public String toString() {
        return "Maestro{" + "idMaestro=" + idMaestro + ", nombre=" + nombre + ", apePaterno=" + apePaterno + ", apeMaterno=" + apeMaterno + ", matricula=" + matricula + ", area=" + area + ", usuario=" + usuario + '}';
    }    
}