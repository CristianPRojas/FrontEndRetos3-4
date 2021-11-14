                                //Categoria

//Función que permite visualizar la tabla de categorias.
function verCategorias(){
    $.ajax({
        url:"http://localhost:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarTabla(respuesta);
        }
    });
}

//Función que construye la tabla para poder mostrarla en la pantalla para el usuario
function pintarTabla(respuesta){
    let myTable="<table>";
    myTable+="<td>Nombre</td>";
    myTable+="<td>description</td>";
    myTable+="<td>options</td>";
        for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <button onclick='actualizarInformacionCategorias("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarCategoria("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#categoria").html(myTable);
}

//Guarda los datos registrados en pantalla por el usuario.
function guardarCategorias(){
    let datos={
        name:$("#nameCateg").val(),
        description:$("#descriptionCateg").val()
    };

    $.ajax({
        type:'POST',
        contentType:"application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(datos),
        url:"http://localhost:8080/api/Category/save",

        success:function(respuesta){
            console.log(respuesta);
            alert("Se guardo correctamente");
            window.location.reload();
        },

        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");
        }
    });
}

//Actualiza la información registrada en los campos de la zona de categorias.
function actualizarInformacionCategorias(idCat){
    let datos1={
        id:idCat,
        name:$("#nameCateg").val(),
        description:$("#descriptionCateg").val()
    };

    console.log(datos1);
    let dataToSend=JSON.stringify(datos1);
    $.ajax({
        url:"http://localhost:8080/api/Category/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#categoria").empty();
            $("#nameCateg").val("");
            $("#descriptionCateg").val("");
            verCategorias();
            alert("se ha Actualizado correctamente la categoria")
        }
    });
}

//Borra los datos seleccionados por el usuario.
function borrarCategoria(idCat){
    let myDato={
        id:idCat
    };

    let dataToSend=JSON.stringify(myDato);

    $.ajax({
        url:"http://localhost:8080/api/Category/"+idCat,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        
        success:function(respuesta){
            $("#categoria").empty();
            verCategorias();
            alert("Se ha Eliminado.")
        }
    });
}

                                            //Cuatrimotos

//Función que permite visualizar la tabla de Cuatrimotos
function verMotos(){
    $.ajax({
        url:"http://localhost:8080/api/Quadbike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarTablaMoto(respuesta);
        }
    });
}

//Función que construye la tabla para poder mostrarla en la pantalla para el usuario
function pintarTablaMoto(respuesta){
    let myTable="<table>";
    myTable+="<td>brand</td>";
    myTable+="<td>year</td>";
    myTable+="<td>name</td>";
    myTable+="<td>description</td>";
    myTable+="<td>category</td>";
    myTable+="<td>options</td>";
        for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].brand+"</td>";
        myTable+="<td>"+respuesta[i].year+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].category.name+"</td>";
        myTable+="<td> <button onclick=' actualizarInformacionMoto("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarMoto("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#cuatrimoto").html(myTable);
}

//Guarda los datos registrados en pantalla por el usuario.
function guardarMotos(){
    let datos={
        brand:$("#brandMot").val(),
        year:$("#yearMot").val(),
        name:$("#nameMot").val(),
        description:$("#descriptionMot").val(),
        category:{id:+$("#selectCat").val()},
    };

    $.ajax({
        type:'POST',
        contentType:"application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(datos),
        url:"http://localhost:8080/api/Quadbike/save",

        success:function(respuesta){
            console.log(respuesta);
            alert("Se guardo correctamente");
            window.location.reload();
        },

        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");
        }
    });
}

//Actualiza la información registrada en los campos de la zona de Cuatrimotos.
function actualizarInformacionMoto(idMot){
    let datos1={
        id:idMot,
        brand:$("#brandMot").val(),
        year:$("#yearMot").val(),
        name:$("#nameMot").val(),
        description:$("#descriptionMot").val(),
        category:{id:+$("#selectCat").val()},
    };

    console.log(datos1);
    let dataToSend=JSON.stringify(datos1);
    $.ajax({
        url:"http://localhost:8080/api/Quadbike/update",
        type:'PUT',
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",

        success:function(respuesta){
            $("#cuatrimoto").empty();
            $("#brandMot").val("");
            $("#yearMot").val(""),
            $("#nameMot").val(""),
            $("#descriptionMot").val("");
            verMotos();
            alert("Se ha Actualizado correctamente la Cuatrimoto")
        }
    });
}

//Genera las opciones del select
function autoInicioCategoria(){
        $.ajax({
        url:"http://localhost:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta)
            let $select=$("#selectCat");
            $.each(respuesta,function(id,name){
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("Select "+name.id)
            });
        }
        
    });
}

//Borra los datos seleccionados por el usuario.
function borrarMoto(idMot){
    let myDato={
        id:idMot
    };

    let dataToSend=JSON.stringify(myDato);

    $.ajax({
        url:"http://localhost:8080/api/Quadbike/"+idMot,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        
        success:function(respuesta){
            $("#cuatrimoto").empty();
            verMotos();
            alert("Se ha Eliminado.")
        }
    });
}

                                            //Clientes

//Función que permite visualizar la tabla de clientes
function verClientes(){
    $.ajax({
        url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarTablaCliente(respuesta);
        }
    });
}

//Función que construye la tabla para poder mostrarla en la pantalla para el usuario
function pintarTablaCliente(respuesta){
    let myTable="<table>";
    myTable+="<td>name</td>";
    myTable+="<td>email</td>";
    myTable+="<td>password</td>";
    myTable+="<td>age</td>";
    myTable+="<td>options</td>";
        for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td> <button onclick='actualizarInformacionCliente("+respuesta[i].idClient+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarCliente("+respuesta[i].idClient+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#cliente").html(myTable);
}

//Guarda los datos registrados en pantalla por el usuario.
function guardarCliente(){
    let datos={
        name:$("#nameC").val(),
        email:$("#mailC").val(),
        password:$("#passC").val(),
        age:$("#ageC").val()
    };

    $.ajax({
        type:'POST',
        contentType:"application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(datos),
        url:"http://localhost:8080/api/Client/save",

        success:function(respuesta){
            console.log(respuesta);
            alert("Se guardo correctamente");
            window.location.reload();
        },

        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");
        }
    });
}

//Actualiza la información registrada en los campos de la zona de Clientes.
function actualizarInformacionCliente(idCli){
    let datos1={
        idClient:idCli,
        name:$("#nameC").val(),
        email:$("#mailC").val(),
        password:$("#passC").val(),
        age:$("#ageC").val()
    };

    console.log(datos1);
    let dataToSend=JSON.stringify(datos1);
    $.ajax({
        url:"http://localhost:8080/api/Client/update",
        type:'PUT',
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",

        success:function(respuesta){
            $("#cliente").empty();
            $("#nameC").val("");
            $("#mailC").val(""),
            $("#passC").val(""),
            $("#ageC").val("");
            verClientes();
            alert("Se ha Actualizado correctamente el cliente")
        }
    });
}

//Borra los datos seleccionados por el usuario.
function borrarCliente(idCli){
    let myDato={
        id:idCli
    };

    let dataToSend=JSON.stringify(myDato);

    $.ajax({
        url:"http://localhost:8080/api/Client/"+idCli,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        
        success:function(respuesta){
            $("#cliente").empty();
            verClientes();
            alert("Se ha Eliminado.")
        }
    });
}

                                            //Mensajes

//Función que permite visualizar la tabla de clientes
function verMensajes(){
    $.ajax({
        url:"http://localhost:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarTablaMensajes(respuesta);
        }
    });
}

//Función que construye la tabla para poder mostrarla en la pantalla para el usuario
function pintarTablaMensajes(respuesta){
    let myTable="<table>";
    myTable+="<td>messageText</td>";
    myTable+="<td>quadbike</td>";
    myTable+="<td>password</td>";
    myTable+="<td>client</td>";
    myTable+="<td>options</td>";
        for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td>"+respuesta[i].quadbike.name+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td> <button onclick='actualizarInformacionMensaje("+respuesta[i].idMessage+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarMensaje("+respuesta[i].idMessage+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#mensajes").html(myTable);
}

//Guarda los datos registrados en pantalla por el usuario.
function guardarMensaje(){
    let datos={
        messageText:$("#mensaje").val(),
        quadbike:{id:+$("#selectQuadbike").val()},
        client:{idClient:+$("#selectClient").val()},
    };

    $.ajax({
        type:'POST',
        contentType:"application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(datos),
        url:"http://localhost:8080/api/Message/save",

        success:function(respuesta){
            console.log(respuesta);
            alert("Se guardo correctamente");
            window.location.reload();
        },

        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");
        }
    });
}

//Actualiza la información registrada en los campos de la zona de Mensajes.
function actualizarInformacionMensaje(idMensj){
    let datos1={
        idMessage:idMensj,
        messageText:$("#mensaje").val(),
        quadbike:{id:+$("selectQuadbike").val()},
        client:{idClient:+$("selectClient").val()},
    };

    console.log(datos1);
    let dataToSend=JSON.stringify(datos1);
    $.ajax({
        url:"http://localhost:8080/api/Message/update",
        type:'PUT',
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",

        success:function(respuesta){
            $("#mensajes").empty();
            $("#mensaje").val("");
            verMensajes();
            alert("Se ha Actualizado correctamente el Mensaje")
        }
    });
}

//Borra los datos seleccionados por el usuario.
function borrarMensaje(idMensj){
    let myDato={
        idMessage:idMensj
    };

    let dataToSend=JSON.stringify(myDato);
    $.ajax({
        url:"http://localhost:8080/api/Message/"+idMensj,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        
        success:function(respuesta){
            $("#mensajes").empty();
            verMensajes();
            alert("Se ha Eliminado.")
        }
    });
}

//Genera las opciones de los select.
function autoInicioCliente(){
    $.ajax({
        url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta)
            let $select=$("#selectClient");
            $.each(respuesta,function(id,name){
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
            });
        }
    });
}

//Genera las opciones del select
function autoInicioQuadbike(){
    $.ajax({
        url:"http://localhost:8080/api/Quadbike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta)
            let $select=$("#selectQuadbike");
            $.each(respuesta,function(id,name){
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
            });
        }
    });
}

                                            //Reservación

//Función que permite visualizar la tabla de clientes
function verReservacion(){
    $.ajax({
        url:"http://localhost:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarTablaReservacion(respuesta);
        }
    });
}

//Función que construye la tabla para poder mostrarla en la pantalla para el usuario
function pintarTablaReservacion(respuesta){
    let myTable="<table>";
    myTable+="<td>startDate</td>";
    myTable+="<td>devolutionDate</td>";
    myTable+="<td>status</td>";
    myTable+="<td>client</td>";
    myTable+="<td>quadbike</td>";
    myTable+="<td>options</td>";
        for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].quadbike.name+"</td>";
        myTable+="<td> <button onclick='actualizarInformacionReserva("+respuesta[i].idReservation+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarReserva("+respuesta[i].idReservation+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#reservacion").html(myTable);
}

//Guarda los datos registrados en pantalla por el usuario.
function guardarReserva(){
    let datos={
        startDate:$("#fInicio").val(),
        devolutionDate:$("#fFin").val(),
        status:$("#status").val(),
        client:{idClient:+$("#select-client").val()},
        quadbike:{id:+$("#select-quadbike").val()},
    };

    $.ajax({
        type:'POST',
        contentType:"application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(datos),
        url:"http://localhost:8080/api/Reservation/save",

        success:function(respuesta){
            console.log(respuesta);
            alert("Se guardo correctamente");
            window.location.reload();
        },

        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");
        }
    });
}

//Actualiza la información registrada en los campos de la zona de Mensajes.
function actualizarInformacionReserva(idReser){
    let datos1={
        idReservation:idReser,
        startDate:$("#fInicio").val(),
        devolutionDate:$("#fFin").val(),
        status:$("#status").val(),
        client:{idClient:+$("#select-client").val()},
        quadbike:{id:+$("#select-quadbike").val()},
    };

    console.log(datos1);
    let dataToSend=JSON.stringify(datos1);
    $.ajax({
        url:"http://localhost:8080/api/Reservation/update",
        type:'PUT',
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",

        success:function(respuesta){
            $("#reservacion").empty();
            $("#fInicio").val("");
            $("#fFin").val("");
            verReservacion();
            alert("Se ha Actualizado correctamente la reservación")
        }
    });
}

//Borra los datos seleccionados por el usuario.
function borrarReserva(idReser){
    let myDato={
        idReservation:idReser
    };

    let dataToSend=JSON.stringify(myDato);

    $.ajax({
        url:"http://localhost:8080/api/Reservation/"+idReser,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        
        success:function(respuesta){
            $("#reservacion").empty();
            verReservacion();
            alert("Se ha Eliminado.")
        }
    });
}

//Genera las opciones de los select.
function autoInicioClientR(){
    $.ajax({
        url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta)
            let $select=$("#select-client");
            $.each(respuesta,function(id,name){
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
            });
        }
    });
}

//Genera las opciones del select
function autoInicioQuadbikeR(){
    $.ajax({
        url:"http://localhost:8080/api/Quadbike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta)
            let $select=$("#select-quadbike");
            $.each(respuesta,function(id,name){
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
            });
        }
    });
}

                                            //Reportes

function traerReporteStatus(){
    console.log("test");
    $.ajax({
        url:"http://localhost:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(respuesta){

    let myTable="<table>";
    myTable+="<tr>";
        myTable+="<th>completadas</th>";
        myTable+="<td>"+respuesta.completed+"</td>";
        myTable+="<th>canceladas</th>";
        myTable+="<td>"+respuesta.cancelled+"</td>";
        myTable+="</tr>";
    myTable+="</table>";
    $("#resultadoStatus").html(myTable);
}

function traerReporteDate(){

    var fechaInicio = document.getElementById("RstarDate").value;
    var fechaCierre = document.getElementById("RdevolutionDate").value;
    console.log(fechaInicio);
    console.log(fechaCierre);
    
        $.ajax({
            url:"http://localhost:8080/api/Reservation/report-dates/"+fechaInicio+"/"+fechaCierre,
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaDate(respuesta);
            }
        });
    }

    function pintarRespuestaDate(respuesta){

        let myTable="<table>";
        myTable+="<tr>";
        
        for(i=0;i<respuesta.length;i++){
        myTable+="<th>total</th>";
            myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
            myTable+="<td>"+respuesta[i].startDate+"</td>";
            myTable+="<td>"+respuesta[i].status+"</td>";
            myTable+="</tr>";
        }
        myTable+="</table>";
        $("#resultadoDate").html(myTable);
    }

    function traerReporteClientes(){
        $.ajax({
            url:"http://localhost:8080/api/Reservation/report-clients",
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                pintarRespuestaClientes(respuesta);
            }
        });
    }

    function pintarRespuestaClientes(respuesta){

        let myTable="<table>";
        myTable+="<tr>";
        
        for(i=0;i<respuesta.length;i++){
        myTable+="<th>total</th>";
            myTable+="<td>"+respuesta[i].total+"</td>";
            myTable+="<td>"+respuesta[i].client.name+"</td>";
            myTable+="<td>"+respuesta[i].client.email+"</td>";
            myTable+="<td>"+respuesta[i].client.age+"</td>";
        
            myTable+="</tr>";
        }
        myTable+="</table>";
        $("#resultadoClientes").html(myTable);
    }