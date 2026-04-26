import { useState } from "react";
import CashIcon from "../../../assets/icons/Cash.svg";
import CardIcon from "../../../assets/icons/CreditCard.svg";


export const PaymentWizardModal = ({ isOpen, onClose, orderData }) => {
    // --- ESTADOS DEL WIZARD ---
    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState("CASH");
    const [clientName, setClientName] = useState("");

    // --- ESTADOS PARA EFECTIVO ---
    const [cashReceived, setCashReceived] = useState("");

    // --- ESTADOS PARA TARJETA ---
    const [cardData, setCardData] = useState({
        number: "",
        name: "",
        expiry: "",
        cvv: ""
    });
    const [isCvvFocused, setIsCvvFocused] = useState(false);

    if (!isOpen || !orderData) return null;

    // --- MATEMÁTICAS DE LA FACTURA (Guatemala IVA 12%) ---
    const total = orderData.total || 0;
    const subtotal = total / 1.12;
    const iva = total - subtotal;

    // Cálculo de vuelto (solo si el monto recibido es mayor al total)
    const change = parseFloat(cashReceived) >= total ? (parseFloat(cashReceived) - total) : 0;

    // --- MANEJADORES ---
    const handleNextStep = (e) => {
        e.preventDefault();
        if (step === 1) setStep(2);
    };

    const handleConfirmPayment = () => {
        alert(`¡Pago Procesado con Éxito!\nFactura generada para: ${clientName || "Consumidor Final"}\nMétodo: ${paymentMethod}`);
        // Aquí luego harás tu petición Axios al Backend para guardar la Billing
        setStep(1);
        onClose();
    };

    const handleCardChange = (e) => {
        const { name, value } = e.target;

        if (name === "number") {
            // 1. Eliminamos cualquier cosa que no sea número (letras, símbolos)
            const onlyNumbers = value.replace(/\D/g, "");
            // 2. Agregamos un espacio cada 4 números
            const formattedNumber = onlyNumbers.replace(/(\d{4})(?=\d)/g, "$1 ");

            // Actualizamos el estado (limitado a 19 caracteres: 16 números + 3 espacios)
            if (formattedNumber.length <= 19) {
                setCardData({ ...cardData, [name]: formattedNumber });
            }
        }
        else if (name === "expiry") {
            // Formato automático para MM/YY
            const onlyNumbers = value.replace(/\D/g, "");
            let formattedExpiry = onlyNumbers;
            if (onlyNumbers.length > 2) {
                formattedExpiry = `${onlyNumbers.slice(0, 2)}/${onlyNumbers.slice(2, 4)}`;
            }
            setCardData({ ...cardData, [name]: formattedExpiry });
        }
        else if (name === "cvv") {
            // Solo permitimos números en el CVV
            const onlyNumbers = value.replace(/\D/g, "");
            if (onlyNumbers.length <= 3) {
                setCardData({ ...cardData, [name]: onlyNumbers });
            }
        }
        else {
            // Para el nombre (solo lo ponemos en mayúsculas)
            setCardData({ ...cardData, [name]: value.toUpperCase() });
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md animate-fadeIn">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* HEADER DEL WIZARD */}
                <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-black italic text-gray-800 uppercase">
                            Procesar <span className="text-kinal-red">Pago</span>
                        </h2>
                        <p className="text-sm font-bold text-gray-400">Orden: ORD-{orderData._id.slice(-4).toUpperCase()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`w-8 h-8 flex items-center justify-center rounded-full font-black text-sm ${step === 1 ? 'bg-kinal-red text-white' : 'bg-green-100 text-green-600'}`}>1</span>
                        <div className={`w-8 h-1 rounded-full ${step === 2 ? 'bg-kinal-red' : 'bg-gray-200'}`}></div>
                        <span className={`w-8 h-8 flex items-center justify-center rounded-full font-black text-sm ${step === 2 ? 'bg-kinal-red text-white' : 'bg-gray-200 text-gray-400'}`}>2</span>
                    </div>
                </div>

                <div className="p-8 overflow-y-auto">
                    {/* ================= PASO 1: DETALLES Y MÉTODO ================= */}
                    {step === 1 && (
                        <form onSubmit={handleNextStep} className="space-y-6 animate-fadeIn">

                            {/* Resumen de Cuenta */}
                            <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
                                <h3 className="text-xs font-black text-kinal-orange uppercase tracking-widest mb-4">Resumen de Factura</h3>
                                <div className="space-y-2 text-sm font-bold text-gray-600">
                                    <div className="flex justify-between"><span>Subtotal:</span> <span>Q {subtotal.toFixed(2)}</span></div>
                                    <div className="flex justify-between"><span>IVA (12%):</span> <span>Q {iva.toFixed(2)}</span></div>
                                    <div className="flex justify-between text-xl font-black text-kinal-red pt-2 border-t border-orange-200 mt-2">
                                        <span>TOTAL A PAGAR:</span> <span>Q {total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Datos del Cliente */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-bold text-gray-700">Cliente (NIT o Nombre)</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Ej: Consumidor Final / 1234567-8"
                                    value={clientName}
                                    onChange={(e) => setClientName(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white"
                                />
                            </div>

                            {/* Método de Pago */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-gray-700">Método de Pago</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button type="button" onClick={() => setPaymentMethod('CASH')} className={`p-4 rounded-xl border-2 font-black uppercase transition-all ${paymentMethod === 'CASH' ? 'border-kinal-red bg-red-50 text-kinal-red' : 'border-gray-100 text-gray-400 hover:border-gray-200'}`}>
                                        <img src={CashIcon} alt="Efectivo" className="w-6 h-6 mx-auto mb-2" />
                                        Efectivo
                                    </button>
                                    <button type="button" onClick={() => setPaymentMethod('CARD')} className={`p-4 rounded-xl border-2 font-black uppercase transition-all ${paymentMethod === 'CARD' ? 'border-kinal-red bg-red-50 text-kinal-red' : 'border-gray-100 text-gray-400 hover:border-gray-200'}`}>
                                        <img src={CardIcon} alt="Tarjeta" className="w-6 h-6 mx-auto mb-2" />
                                        Tarjeta
                                    </button>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={onClose} className="px-6 py-3 text-gray-500 font-bold hover:bg-gray-50 rounded-xl transition-colors">Cancelar</button>
                                <button type="submit" className="bg-kinal-red text-white font-black px-8 py-3 rounded-xl shadow-lg hover:bg-red-700 transition-all uppercase tracking-widest">
                                    Siguiente ➔
                                </button>
                            </div>
                        </form>
                    )}

                    {/* ================= PASO 2: PASARELA DE PAGO ================= */}
                    {step === 2 && (
                        <div className="space-y-6 animate-fadeIn">

                            {paymentMethod === 'CASH' ? (
                                /* ---- CALCULADORA DE EFECTIVO ---- */
                                <div className="space-y-6 text-center">
                                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 inline-block w-full">
                                        <p className="text-sm font-bold text-gray-500 uppercase">Monto a Cobrar</p>
                                        <p className="text-4xl font-black text-gray-800">Q {total.toFixed(2)}</p>
                                    </div>

                                    <div className="flex flex-col gap-2 max-w-sm mx-auto text-left">
                                        <label className="text-sm font-bold text-gray-700">Efectivo Recibido (Q)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            placeholder="0.00"
                                            value={cashReceived}
                                            onChange={(e) => setCashReceived(e.target.value)}
                                            className="w-full px-6 py-4 text-2xl font-black text-center rounded-2xl border-2 border-green-200 focus:border-green-500 focus:ring-0 outline-none bg-green-50"
                                        />
                                    </div>

                                    <div className={`p-6 rounded-2xl border-2 transition-all ${change > 0 ? 'bg-green-100 border-green-300' : 'bg-gray-50 border-gray-100'}`}>
                                        <p className="text-sm font-bold text-gray-500 uppercase mb-1">Vuelto / Cambio</p>
                                        <p className={`text-4xl font-black ${change > 0 ? 'text-green-600' : 'text-gray-300'}`}>
                                            Q {change.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                /* ---- TARJETA ANIMADA (CSS INTERACTIVO) ---- */
                                <div className="space-y-6">
                                    {/* Tarjeta Visual */}
                                    <div className="relative w-80 h-48 mx-auto perspective-1000">
                                        <div className={`w-full h-full absolute transition-all duration-500 transform-style-3d ${isCvvFocused ? 'rotate-y-180' : ''}`}>

                                            {/* Frente de la Tarjeta */}
                                            <div className="absolute w-full h-full bg-gradient-to-tr from-gray-900 to-gray-700 rounded-2xl shadow-xl p-6 flex flex-col justify-between backface-hidden text-white border border-gray-600">
                                                <div className="flex justify-between items-start">
                                                    <div className="w-12 h-8 bg-yellow-400/80 rounded flex items-center justify-end px-2"><div className="w-1 h-full bg-yellow-600/50"></div></div>
                                                    <span className="font-black italic text-xl opacity-50">KFC-Bank</span>
                                                </div>
                                                <div>
                                                    <p className="font-mono text-xl tracking-widest mb-2 shadow-sm">{cardData.number || "#### #### #### ####"}</p>
                                                    <div className="flex justify-between uppercase text-xs font-bold opacity-80">
                                                        <span>{cardData.name || "NOMBRE DEL TITULAR"}</span>
                                                        <span>{cardData.expiry || "MM/YY"}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Reverso de la Tarjeta (Giro 3D) */}
                                            <div className="absolute w-full h-full bg-gradient-to-tr from-gray-800 to-gray-900 rounded-2xl shadow-xl flex flex-col justify-center backface-hidden rotate-y-180 border border-gray-700">
                                                <div className="w-full h-10 bg-black mb-4"></div>
                                                <div className="px-6">
                                                    <div className="bg-white w-full h-8 rounded flex items-center justify-end px-4">
                                                        <span className="font-mono text-black font-black italic">{cardData.cvv || "###"}</span>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    {/* Formulario de Tarjeta */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text" name="number" placeholder="Número de Tarjeta"
                                            value={cardData.number} onChange={handleCardChange}
                                            className="col-span-2 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-kinal-red font-mono"
                                        />
                                        <input
                                            type="text" name="name" placeholder="Nombre en Tarjeta"
                                            value={cardData.name} onChange={handleCardChange}
                                            className="col-span-2 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-kinal-red uppercase"
                                        />
                                        <input
                                            type="text" name="expiry" placeholder="MM/YY"
                                            value={cardData.expiry} onChange={handleCardChange}
                                            className="px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-kinal-red text-center"
                                        />
                                        <input
                                            type="password" name="cvv" placeholder="CVV"
                                            value={cardData.cvv} onChange={handleCardChange}
                                            onFocus={() => setIsCvvFocused(true)} onBlur={() => setIsCvvFocused(false)}
                                            className="px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-kinal-red text-center font-mono"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="pt-4 flex gap-3 border-t border-gray-100 mt-6">
                                <button type="button" onClick={() => setStep(1)} className="px-6 py-4 text-gray-500 font-bold hover:bg-gray-50 rounded-xl transition-colors border border-gray-200">
                                    Volver
                                </button>
                                <button
                                    type="button"
                                    onClick={handleConfirmPayment}
                                    disabled={paymentMethod === 'CASH' && change < 0}
                                    className={`flex-1 font-black px-8 py-4 rounded-xl shadow-lg transition-all uppercase tracking-widest ${paymentMethod === 'CASH' && change < 0
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-green-500 text-white hover:bg-green-600 hover:scale-[1.02]'
                                        }`}
                                >
                                    Confirmar Pago • Q {total.toFixed(2)}
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};