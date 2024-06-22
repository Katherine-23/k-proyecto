<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
   
    public function index()
    {
        return Producto::all();
    }

    
    public function store(Request $request)
    {
        // Validar los campos de la solicitud
        $request->validate([
            'nombre' => 'required|string|max:255',
            'categoria' => 'required|string|max:255',
            'precio' => 'required|numeric|min:0',
        ]);

        // Crear una nueva instancia de Producto
        $producto = new Producto();
        $producto->nombre = $request->nombre;
        $producto->categoria = $request->categoria;
        $producto->precio = $request->precio;
        $producto->save();

        // Retornar una respuesta de éxito
        return response()->json(['message' => 'Producto creado correctamente', 'producto' => $producto], 201);
    }

    
    public function show(Producto $producto)
    {
        return $producto;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Producto $producto)
    {
    // Validar los campos de la solicitud
    $request->validate([
        'nombre' => 'required|string|max:255',
        'categoria' => 'required|string|max:255',
        'precio' => 'required|numeric|min:0',
    ]);

    // Actualizar los campos del producto
    $producto->nombre = $request->nombre;
    $producto->categoria = $request->categoria;
    $producto->precio = $request->precio;
    $producto->save();

    // Retornar una respuesta con el producto actualizado
    return response()->json(['message' => 'Producto actualizado correctamente', 'producto' => $producto], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Producto $producto)
    {
        // Verificar si el producto existe
        if (!$producto) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        // Eliminar el producto
        $producto->delete();

        // Retornar un mensaje de éxito
        return response()->json(['message' => 'Producto eliminado correctamente'], 200);
    }
}
