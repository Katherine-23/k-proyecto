<?php

namespace App\Http\Controllers;

use App\Models\Proveedores;
use Illuminate\Http\Request;

class ProveedoresController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Obtener todos los proveedores y devolverlos como respuesta
        return Proveedores::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar los campos de la solicitud
        $request->validate([
            'nombre' => 'required|string|max:255',
            'estado' => 'required|integer',
        ]);

        // Crear un nuevo proveedor
        $proveedor = new Proveedores();
        $proveedor->nombre = $request->input('nombre');
        $proveedor->estado = $request->input('estado');
        $proveedor->save();

        // Retornar una respuesta indicando que el proveedor ha sido creado correctamente
        return response()->json(['message' => 'Proveedor creado correctamente', 'proveedor' => $proveedor], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Proveedores $proveedores)
    {
        // Devolver el proveedor solicitado
        return $proveedores;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Proveedores $proveedores)
    {
        // Validar los campos de la solicitud
        $request->validate([
            'nombre' => 'required|string|max:255',
            'estado' => 'required|integer',
        ]);

        // Actualizar los campos del proveedor
        $proveedores->nombre = $request->input('nombre');
        $proveedores->estado = $request->input('estado');
        $proveedores->save();

        // Retornar una respuesta indicando que el proveedor ha sido actualizado correctamente
        return response()->json(['message' => 'Proveedor actualizado correctamente', 'proveedor' => $proveedores], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Proveedores $proveedores)
    {
        // Eliminar el proveedor de la base de datos
        $proveedores->delete();

        // Retornar una respuesta indicando que el proveedor ha sido eliminado correctamente
        return response()->json(['message' => 'Proveedor eliminado correctamente'], 200);
    }
}
