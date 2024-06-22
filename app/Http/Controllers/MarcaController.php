<?php

namespace App\Http\Controllers;

use App\Models\Marca;
use Illuminate\Http\Request;

class MarcaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Marca::all();
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

        // Crear una nueva instancia de Marca
        $marca = new Marca();
        // Asignar valores a los campos del modelo Marca
        $marca->nombre = $request->input('nombre');
        $marca->estado = $request->input('estado');
        // Guardar el objeto Marca en la base de datos
        $marca->save();

        // Retornar un mensaje de éxito
        return response()->json(['message' => 'Marca creada correctamente'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Marca $marca)
    {
        return $marca;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Marca $marca)
    {
        // Validar los campos de la solicitud
        $request->validate([
            'nombre' => 'required|string|max:255',
            'estado' => 'required|integer',
        ]);

        // Actualizar los campos del modelo Marca
        $marca->nombre = $request->input('nombre');
        $marca->estado = $request->input('estado');
        // Guardar el objeto Marca en la base de datos
        $marca->save();

        // Retornar un mensaje de éxito
        return response()->json(['message' => 'Marca actualizada correctamente'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Marca $marca)
    {
        // Eliminar el objeto Marca de la base de datos
        $marca->delete();

        // Retornar un mensaje de éxito
        return response()->json(['message' => 'Marca eliminada correctamente'], 200);
    }
}
