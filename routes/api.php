<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CartPurchaseController;
use App\Http\Controllers\MarcaController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\OrdersPurchaseController;
use App\Http\Controllers\ProveedoresController;
use App\Http\Controllers\UsuariosController;
use App\Http\Middleware\CorsMiddleware;
use App\Http\Controllers\ProductoFrescuraController;
use App\Http\Controllers\PersonaController;

Route::middleware([CorsMiddleware::class])->group(function () {
    Route::apiResource('clientes', ClienteController::class);
    Route::post('/clientes', [ClienteController::class, 'store']);
    Route::put('/clientes/{cliente}', [ClienteController::class, 'update']);
    Route::delete('/clientes/{cliente}', [ClienteController::class, 'destroy']);

    Route::apiResource('categorias',CategoriaController::class);
    Route::post('/categorias', [CategoriaController::class, 'store']);
    Route::put('/categorias/{categoria}', [CategoriaController::class, 'update']);
    Route::delete('/categorias/{categoria}', [CategoriaController::class, 'destroy']);

    Route::apiResource('productos', ProductoController::class);
    Route::post('/productos', [ProductoController::class, 'store']);
    Route::put('/productos/{producto}', [ProductoController::class, 'update']);
    Route::delete('/productos/{producto}', [ProductoController::class, 'destroy']);

    Route::apiResource('carts',CartController::class);
    Route::get('/carts/{cart}', [CartController::class, 'show']);
    Route::put('/carts/{cart}', [CartController::class, 'update']);
    Route::delete('/carts/{cart}', [CartController::class, 'destroy']);

    Route::apiResource('cart-purchases', CartPurchaseController::class);
    Route::get('/cart-purchases/{cart_purchase}', [CartPurchaseController::class, 'show']);
    Route::put('/cart-purchases/{cart_purchase}', [CartPurchaseController::class, 'update']);
    Route::delete('/cart-purchases/{cart_purchase}', [CartPurchaseController::class, 'destroy']);

    Route::apiResource('marcas', MarcaController::class);
    Route::get('/marcas/{marca}', [MarcaController::class, 'show']);
    Route::put('/marcas/{marca}', [MarcaController::class, 'update']);
    Route::delete('/marcas/{marca}', [MarcaController::class, 'destroy']);

    Route::apiResource('orders', OrdersController::class);
    Route::get('/orders/{order}', [OrdersController::class, 'show']);
    Route::put('/orders/{order}', [OrdersController::class, 'update']);
    Route::delete('/orders/{order}', [OrdersController::class, 'destroy']);

    Route::apiResource('orders-purchases', OrdersPurchaseController::class);
    Route::get('/orders-purchases/{ordersPurchase}', [OrdersPurchaseController::class, 'show']);
    Route::put('/orders-purchases/{ordersPurchase}', [OrdersPurchaseController::class, 'update']);
    Route::delete('/orders-purchases/{ordersPurchase}', [OrdersPurchaseController::class, 'destroy']);

    Route::apiResource('proveedores', ProveedoresController::class);
    Route::get('/proveedores/{proveedores}', [ProveedoresController::class, 'show']);
    Route::put('/proveedores/{proveedores}', [ProveedoresController::class, 'update']);
    Route::delete('/proveedores/{proveedores}', [ProveedoresController::class, 'destroy']);

    Route::apiResource('usuarios', UsuariosController::class);
    Route::get('/usuarios/{usuarios}', [UsuariosController::class, 'show']);
    Route::put('/usuarios/{usuarios}', [UsuariosController::class, 'update']);
    Route::delete('/usuarios/{usuarios}', [UsuariosController::class, 'destroy']);

    Route::get('/productos_frescura', [ProductoFrescuraController::class, 'index'])->name('productos_frescura.index');
    Route::post('/productos_frescura', [ProductoFrescuraController::class, 'store'])->name('productos_frescura.store');
    Route::put('/productos_frescura/{productoFrescura}', [ProductoFrescuraController::class, 'update'])->name('productos_frescura.update');
    Route::delete('/productos_frescura/{productoFrescura}', [ProductoFrescuraController::class, 'destroy'])->name('productos_frescura.destroy');

    Route::get('/personas', [PersonaController::class, 'index'])->name('personas.index');
    Route::post('/personas', [PersonaController::class, 'store'])->name('personas.store');
    Route::put('/personas/{persona}', [PersonaController::class, 'update'])->name('personas.update');
    Route::delete('/personas/{persona}', [PersonaController::class, 'destroy'])->name('personas.destroy');
});
