<?php

namespace App\Http\Controllers;

use App\Models\Orders;
use Illuminate\Http\Request;

class OrdersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Orders::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar los campos de la solicitud
        $request->validate([
            'nombre' => 'required|string|max:255',
            'metodo' => 'required|string|max:255',
            'productos' => 'required|string',
            'precio' => 'required|integer',
            'tipo' => 'required|string|max:255',
        ]);

        // Crear una nueva instancia de Orders
        $order = new Orders();
        // Asignar valores a los campos del modelo Orders
        $order->nombre = $request->nombre;
        $order->metodo = $request->metodo;
        $order->productos = $request->productos;
        $order->precio = $request->precio;
        $order->tipo = $request->tipo;
       // Guardar el objeto Orders en la base de datos
        $order->save();

// Retornar un mensaje de éxito
return response()->json(['message' => 'Orden agregada correctamente'], 201); 
    }

    /**
     * Display the specified resource.
     */
    public function show(Orders $orders)
    {
        return $orders;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Orders $orders)
    {
        // Validar los campos de la solicitud
        $request->validate([
            'nombre' => 'required|string|max:255',
            'metodo' => 'required|string|max:255',
            'productos' => 'required|string',
            'precio' => 'required|integer',
            'tipo' => 'required|string|max:255',
        ]);

        // Actualizar los campos del modelo Orders solo si se han proporcionado en la solicitud
        $orders->fill($request->only(['nombre', 'metodo', 'productos', 'precio', 'tipo']));
        // Guardar el objeto Orders en la base de datos
        $orders->save();

        // Retornar un mensaje de éxito
        return response()->json(['message' => 'Orden actualizada correctamente'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Orders $orders)
    {
        // Eliminar el objeto Orders de la base de datos
        $orders->delete();

        // Retornar un mensaje de éxito
        return response()->json(['message' => 'Orden eliminada correctamente'], 200);
    }
}
