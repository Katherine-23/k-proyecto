<?php

namespace App\Http\Controllers;

use App\Models\ProductoFrescura;
use Illuminate\Http\Request;

class ProductoFrescuraController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Devuelve una lista de todos los productos de frescura
        return ProductoFrescura::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validación de datos
        $request->validate([
            'Nombre' => 'required|string',
            'Descripción' => 'required|string',
            'precio' => 'required|integer',
        ]);

        // Almacena un nuevo producto de frescura en la base de datos
        $productoFrescura = new ProductoFrescura([
            'Nombre' => $request->input('Nombre'),
            'Descripción' => $request->input('Descripción'),
            'precio' => $request->input('precio'),
        ]);
        $productoFrescura->save();

        return response()->json(['message' => 'Producto de frescura creado exitosamente'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductoFrescura $productoFrescura)
    {
        // Muestra los detalles de un producto de frescura específico
        return $productoFrescura;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProductoFrescura $productoFrescura)
    {
        // Validación de datos
        $request->validate([
            'Nombre' => 'required|string',
            'Descripción' => 'required|string',
            'precio' => 'required|integer',
        ]);

        // Actualiza la información de un producto de frescura específico
        $productoFrescura->update([
            'Nombre' => $request->input('Nombre'),
            'Descripción' => $request->input('Descripción'),
            'precio' => $request->input('precio'),
        ]);

        return response()->json(['message' => 'Producto de frescura actualizado exitosamente'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductoFrescura $productoFrescura)
    {
        // Elimina un producto de frescura específico de la base de datos
        $productoFrescura->delete();
        return response()->json(['message' => 'Producto de frescura eliminado exitosamente'], 200);
    }
}
