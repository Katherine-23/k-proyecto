<?php

namespace App\Http\Controllers;

use App\Models\CartPurchase;
use Illuminate\Http\Request;


class CartPurchaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return CartPurchase::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar los campos de la solicitud
        $request->validate([
            'usuario' => 'required|string|max:255',
            'producto' => 'required|string|max:255',
            'precio' => 'required|integer',
            'cantidad' => 'required|integer',
        ]);

        // Crear una nueva instancia de CartPurchase
        $cartPurchase = new CartPurchase();
        // Asignar valores a los campos del modelo CartPurchase
        $cartPurchase->usuario = $request->input('usuario');
        $cartPurchase->producto = $request->input('producto');
        $cartPurchase->precio = $request->input('precio');
        $cartPurchase->cantidad = $request->input('cantidad');
        // Guardar el objeto CartPurchase en la base de datos
        $cartPurchase->save();

        // Retornar un mensaje de éxito
        return response()->json(['message' => 'Compra agregada correctamente'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(CartPurchase $cart_purchase)
    {
        return $cart_purchase;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CartPurchase $cart_purchase)
    {
        // Validar los campos de la solicitud
        $request->validate([
            'usuario' => 'required|string|max:255',
            'producto' => 'required|string|max:255',
            'precio' => 'required|integer',
            'cantidad' => 'required|integer',
        ]);

        // Actualizar los campos del modelo CartPurchase
        $cart_purchase->usuario = $request->input('usuario');
        $cart_purchase->producto = $request->input('producto');
        $cart_purchase->precio = $request->input('precio');
        $cart_purchase->cantidad = $request->input('cantidad');
        // Guardar el objeto CartPurchase en la base de datos
        $cart_purchase->save();

        // Retornar un mensaje de éxito
        return response()->json(['message' => 'Compra actualizada correctamente'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CartPurchase $cart_purchase)
    {
        // Eliminar el objeto CartPurchase de la base de datos
        $cart_purchase->delete();

        // Retornar un mensaje de éxito
        return response()->json(['message' => 'Compra eliminada correctamente'], 200);
    }
}
