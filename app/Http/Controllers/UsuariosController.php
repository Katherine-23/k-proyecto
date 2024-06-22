<?php

namespace App\Http\Controllers;

use App\Models\Usuarios;
use Illuminate\Http\Request;

class UsuariosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Obtener todos los usuarios y devolverlos como respuesta
        return Usuarios::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar los campos de la solicitud
        $request->validate([
            'nombre' => 'required|string|max:255',
            'correo' => 'required|string|email|unique:usuarios|max:255',
            'contraseña' => 'required|string|min:8',
            'rol' => 'required|string|max:255',
        ]);

        // Crear un nuevo usuario con los datos proporcionados
        $usuario = new Usuarios();
        $usuario->nombre = $request->nombre;
        $usuario->correo = $request->correo;
        $usuario->contraseña = bcrypt($request->contraseña); // Se recomienda hashear la contraseña
        $usuario->rol = $request->rol;
        $usuario->save();

        // Retornar una respuesta con un mensaje de éxito
        return response()->json(['message' => 'Usuario creado correctamente'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Usuarios $usuarios)
    {
        // Devolver el usuario solicitado
        return $usuarios;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Usuarios $usuarios)
    {
        // Validar los campos de la solicitud
        $request->validate([
            'nombre' => 'required|string|max:255',
            'correo' => 'required|string|email|max:255',
            'contraseña' => 'required|string|min:8',
            'rol' => 'required|string|max:255',
        ]);

        // Actualizar los datos del usuario con los datos proporcionados
        $usuarios->nombre = $request->nombre;
        $usuarios->correo = $request->correo;
        $usuarios->contraseña = bcrypt($request->contraseña); // Se recomienda hashear la contraseña
        $usuarios->rol = $request->rol;
        $usuarios->save();

        // Retornar una respuesta con un mensaje de éxito
        return response()->json(['message' => 'Usuario actualizado correctamente'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Usuarios $usuarios)
    {
        // Eliminar el usuario
        $usuarios->delete();

        // Retornar una respuesta con un mensaje de éxito
        return response()->json(['message' => 'Usuario eliminado correctamente'], 200);
    }
}

