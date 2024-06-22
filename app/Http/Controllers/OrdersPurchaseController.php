<?php

namespace App\Http\Controllers;

use App\Models\OrdersPurchase;
use Illuminate\Http\Request;

class OrdersPurchaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Obtener todas las compras de órdenes
        return OrdersPurchase::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar los campos de la solicitud
        $request->validate([
            'usuario' => 'required|string|max:255',
            'metodo' => 'required|string|max:255',
            'productos' => 'required|string',
            'precio' => 'required|integer',
            'tipo' => 'required|string|max:255',
        ]);

        // Crear una nueva instancia de OrdersPurchase
        $ordersPurchase = new OrdersPurchase();
        // Asignar valores a los campos del modelo OrdersPurchase
        $ordersPurchase->usuario = $request->input('usuario');
        $ordersPurchase->metodo = $request->input('metodo');
        $ordersPurchase->productos = $request->input('productos');
        $ordersPurchase->precio = $request->input('precio');
        $ordersPurchase->tipo = $request->input('tipo');
        // Guardar el objeto OrdersPurchase en la base de datos
        $ordersPurchase->save();

        // Retornar un mensaje de éxito
        return response()->json(['message' => 'Compra de orden agregada correctamente'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(OrdersPurchase $ordersPurchase)
    {
        // Retornar la compra de orden específica
        return $ordersPurchase;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, OrdersPurchase $ordersPurchase)
    {
        // Validar los campos de la solicitud
        $request->validate([
            'usuario' => 'required|string|max:255',
            'metodo' => 'required|string|max:255',
            'productos' => 'required|string',
            'precio' => 'required|integer',
            'tipo' => 'required|string|max:255',
        ]);

        // Actualizar los campos del modelo OrdersPurchase
        $ordersPurchase->usuario = $request->input('usuario');
        $ordersPurchase->metodo = $request->input('metodo');
        $ordersPurchase->productos = $request->input('productos');
        $ordersPurchase->precio = $request->input('precio');
        $ordersPurchase->tipo = $request->input('tipo');
        // Guardar el objeto OrdersPurchase en la base de datos
        $ordersPurchase->save();

        // Retornar un mensaje de éxito
        return response()->json(['message' => 'Compra de orden actualizada correctamente'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OrdersPurchase $ordersPurchase)
    {
        // Eliminar el objeto OrdersPurchase de la base de datos
        $ordersPurchase->delete();

        // Retornar un mensaje de éxito
        return response()->json(['message' => 'Compra de orden eliminada correctamente'], 200);
    }
}
