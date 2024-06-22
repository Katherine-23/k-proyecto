<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;

class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       return Cliente::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar los campos de la solicitud
        $request->validate([
            'nombres' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
        ]);

        // Crear una nueva instancia de Cliente
        $cliente = new Cliente();
        $cliente->nombres = $request->nombres;
        $cliente->apellidos = $request->apellidos;
        $cliente->save();

        // Retornar el nuevo cliente creado
        return response()->json(['message' => 'Cliente creado correctamente', 'cliente' => $cliente], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Cliente $cliente)
    {
        return $cliente;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cliente $cliente)
    {
        // Validar los campos de la solicitud
        $request->validate([
            'nombres' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
        ]);

        // Actualizar los campos del cliente
        $cliente->nombres = $request->nombres;
        $cliente->apellidos = $request->apellidos;
        $cliente->save();

        // Retornar el cliente actualizado
        return response()->json(['message' => 'Cliente actualizado correctamente', 'cliente' => $cliente], 200);
    }
    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cliente $cliente)
    {
        // Verificar si el cliente existe
        if (!$cliente) {
            return response()->json(['message' => 'Cliente no encontrado'], 404);
        }

        // Eliminar el cliente
        $cliente->delete();

        // Retornar un mensaje de éxito
        return response()->json(['message' => 'Cliente eliminado correctamente'], 200);
    }
}
