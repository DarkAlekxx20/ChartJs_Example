package org.chjs.rest;
import com.google.gson.Gson;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;
import org.chjs.controller.MaestroController;
import org.chjs.model.Maestro;

/**
 * @author Alex SP
 */
@Path("maestro")
public class MaestrosREST {
@POST
    @Path("save")
    @Produces(MediaType.APPLICATION_JSON)
    public Response save(@FormParam("datosMaestro") @DefaultValue("") String datosMaestro){
        String out = null;
        MaestroController cm = null;
        Maestro m = new Maestro();
        Gson gson = new Gson();
        try {
            m = gson.fromJson(datosMaestro, Maestro.class);
            cm = new MaestroController();
            cm.save(m);
            out= gson.toJson(m);  
        }catch(Exception ex){
            ex.printStackTrace();
            out = """
                  {"exception" : "%s"}
                  """;
            out = String.format(out, ex.toString());
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    @GET
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll (@QueryParam("filtro") @DefaultValue("")String filtro){
        String out = null;
        MaestroController ce = null;
        List<Maestro> m = null;
        try{
            ce = new MaestroController();
            m = ce.getAll(filtro);
            out = new Gson().toJson(m);
        }
        catch(Exception e){
            e.printStackTrace();
            out= "{\"exception\":\"Error interno del servidor.\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
}