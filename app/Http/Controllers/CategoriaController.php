<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       return Categoria::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar los campos de la solicitud
        $request->validate([
            'nombres' => 'required|string|max:255',
            'tipo' => 'required|string|max:255',
        ]);

        // Crear una nueva instancia de Categoria
        $categoria = new Categoria();
        $categoria->nombres = $request->nombres;
        $categoria->tipo = $request->tipo;
        $categoria->save();

        // Retornar la nueva categoria creada
        return response()->json(['message' => 'Categoria creada correctamente', 'categoria' => $categoria], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Categoria $categoria)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Categoria $categoria)
    {
        // Validar los campos de la solicitud
        $request->validate([
            'nombres' => 'required|string|max:255',
            'tipo' => 'required|string|max:255',
        ]);

        // Actualizar los campos de la categoría
        $categoria->nombres = $request->nombres;
        $categoria->tipo = $request->tipo;
        $categoria->save();

        // Retornar la categoría actualizada
        return response()->json(['message' => 'Categoria actualizada correctamente', 'categoria' => $categoria], 200);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Categoria $categoria)
    {
        // Verificar si la categoría existe
        if (!$categoria) {
            return response()->json(['message' => 'Categoría no encontrada'], 404);
        }

        // Eliminar la categoría
        $categoria->delete();

        // Retornar un mensaje de éxito
        return response()->json(['message' => 'Categoría eliminada correctamente'], 200);
    }
}
