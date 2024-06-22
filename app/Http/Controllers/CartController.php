<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Cart::all();
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
            // Puedes agregar más reglas de validación según tus necesidades
        ]);

        // Crear un nuevo carrito y asignar los valores de los campos
        $cart = new Cart();
        $cart->usuario = $request->usuario;
        $cart->producto = $request->producto;
        // Puedes asignar más campos según tu modelo Cart

        // Guardar el nuevo carrito en la base de datos
        $cart->save();

        // Retornar una respuesta exitosa
        return response()->json(['message' => 'Carrito creado correctamente', 'cart' => $cart], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Cart $cart)
    {
        return $cart;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cart $cart)
    {
        // Validar los campos de la solicitud
        $request->validate([
            'usuario' => 'required|string|max:255',
            'producto' => 'required|string|max:255',
        ]);

        // Actualizar los campos del carrito
        $cart->update([
            'usuario' => $request->usuario,
            'producto' => $request->producto,
        ]);

        // Retornar una respuesta indicando que el carrito ha sido actualizado correctamente
        return response()->json(['message' => 'Carrito actualizado correctamente', 'cart' => $cart], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cart $cart)
    {
        // Verificar si el carrito existe
        if (!$cart) {
            return response()->json(['message' => 'Carrito no encontrado'], 404);
        }

        // Eliminar el carrito
        $cart->delete();

        // Retornar un mensaje de éxito
        return response()->json(['message' => 'Carrito eliminado correctamente'], 200);
    }
}
