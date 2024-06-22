<?php

namespace App\Http\Controllers;

use App\Models\Persona;
use Illuminate\Http\Request;

class PersonaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Devuelve una lista de todas las personas
        return Persona::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar los datos del formulario
        $request->validate([
            'Nombre' => 'required|string',
            'Apellido' => 'required|string',
            'Usuario' => 'required|string',
            'Email' => 'required|email',
            'Contraseña' => 'required|string',
        ]);

        // Crear una nueva instancia del modelo Persona y guardarla en la base de datos
        $persona = Persona::create($request->all());

        // Devolver una respuesta indicando que la persona se ha creado correctamente
        return response()->json(['message' => 'Persona creada exitosamente', 'persona' => $persona], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Persona $persona)
    {
        // Muestra los detalles de una persona específica
        return $persona;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Persona $persona)
    {
        // Validación de datos
        $request->validate([
            'Nombre' => 'required|string',
            'Apellido' => 'required|string',
            'Usuario' => 'required|string',
            'Email' => 'required|email',
            'Contraseña' => 'required|string',
        ]);

        // Actualizar los datos de la persona con los nuevos valores
        $persona->update($request->all());

        // Devolver una respuesta indicando que la persona se ha actualizado correctamente
        return response()->json(['message' => 'Persona actualizada exitosamente', 'persona' => $persona], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Persona $persona)
    {
        // Eliminar la persona de la base de datos
        $persona->delete();

        // Devolver una respuesta indicando que la persona se ha eliminado correctamente
        return response()->json(['message' => 'Persona eliminada exitosamente'], 200);
    }
}
