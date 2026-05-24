// PaymentModal.jsx
import { useEffect, useState } from "react";
import { useBillingStore } from "../../../features/users/store/adminStore.js";
import { useUserStore } from "../../users/store/adminStore.js";
import { showError, showSuccess } from "../../../shared/utils/toast.js";
import CashIcon from "../../../assets/icons/Cash.svg";
import CardIcon from "../../../assets/icons/CreditCard.svg";
import NextIcon from "../../../assets/icons/Next.svg";

export const PaymentWizardModal = ({ isOpen, onClose, orderData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { users, getUsers } = useUserStore();
  const payBilling = useBillingStore((state) => state.payBilling);

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [loading, setLoading] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isCreatingClient, setIsCreatingClient] = useState(false);
  const [newClient, setNewClient] = useState({
    UserName: "",
    UserSurname: "",
    UserEmail: "",
  });
  const [cashReceived, setCashReceived] = useState("");
  const [cardData, setCardData] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [isCvvFocused, setIsCvvFocused] = useState(false);

  useEffect(() => {
    if (isOpen) {
      getUsers();
      // Resetear estado al abrir
      setStep(1);
      setSearchTerm("");
      setSelectedClient(null);
      setIsCreatingClient(false);
      setNewClient({ UserName: "", UserSurname: "", UserEmail: "" });
      setCashReceived("");
      setCardData({ number: "", name: "", expiry: "", cvv: "" });
      setPaymentMethod("CASH");
    }
  }, [isOpen, getUsers]);

  const filteredClients = users.filter(
    (u) =>
      u.UserName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.UserSurname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.UserEmail?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (!isOpen || !orderData) return null;

  const rawTotal = Number(orderData.total || orderData.BillTotal || 0);
  const total    = rawTotal;
  const subtotal = rawTotal / 1.12;
  const iva      = rawTotal - subtotal;
  const change   = parseFloat(cashReceived) >= total
    ? parseFloat(cashReceived) - total
    : 0;

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!selectedClient && !isCreatingClient) {
      showError("Por favor selecciona o crea un cliente.");
      return;
    }
    setStep(2);
  };

  const handleConfirmPayment = async () => {
    try {
      setLoading(true);
      const payload = {};
      if (isCreatingClient) {
        payload.newClientData = newClient;
      } else if (selectedClient) {
        payload.clientId = selectedClient._id || selectedClient.uid;
      }
      await payBilling(orderData._id, payload);
      showSuccess("Pago procesado y factura actualizada correctamente");
      onClose();
    } catch (error) {
      console.error(error);
      // El backend devuelve el mensaje "Este cliente ya se encuentra registrado"
      // u otros errores — lo mostramos directamente con Toast
      showError(error.response?.data?.message || "Error al procesar el pago");
    } finally {
      setLoading(false);
    }
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    if (name === "number") {
      const onlyNumbers = value.replace(/\D/g, "");
      const formattedNumber = onlyNumbers.replace(/(\d{4})(?=\d)/g, "$1 ");
      if (formattedNumber.length <= 19) setCardData({ ...cardData, [name]: formattedNumber });
    } else if (name === "expiry") {
      const onlyNumbers = value.replace(/\D/g, "");
      let formattedExpiry = onlyNumbers;
      if (onlyNumbers.length > 2) formattedExpiry = `${onlyNumbers.slice(0, 2)}/${onlyNumbers.slice(2, 4)}`;
      setCardData({ ...cardData, [name]: formattedExpiry });
    } else if (name === "cvv") {
      const onlyNumbers = value.replace(/\D/g, "");
      if (onlyNumbers.length <= 3) setCardData({ ...cardData, [name]: onlyNumbers });
    } else {
      setCardData({ ...cardData, [name]: value.toUpperCase() });
    }
  };

  // Determina qué dígitos de la tarjeta mostrar en la vista visual
  const cardDigits = cardData.number.replace(/\s/g, "").padEnd(16, "·");
  const cardGroups = [
    cardDigits.slice(0, 4),
    cardDigits.slice(4, 8),
    cardDigits.slice(8, 12),
    cardDigits.slice(12, 16),
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md animate-fadeIn p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col max-h-[92vh]">

        {/* HEADER fijo */}
        <div className="bg-gray-50 px-6 md:px-8 py-5 md:py-6 border-b border-gray-100 flex justify-between items-center shrink-0 rounded-t-3xl">
          <div>
            <h2 className="text-xl md:text-2xl font-black italic text-gray-800 uppercase">
              Procesar <span className="text-kinal-red">Pago</span>
            </h2>
            <p className="text-xs md:text-sm font-bold text-gray-400">
              Factura: {orderData.BillSerie}
            </p>
          </div>
          {/* Indicador de pasos */}
          <div className="flex items-center gap-2">
            <span
              className={`w-8 h-8 flex items-center justify-center rounded-full font-black text-sm ${
                step === 1 ? "bg-kinal-red text-white" : "bg-green-100 text-green-600"
              }`}
            >
              1
            </span>
            <div className={`w-8 h-1 rounded-full ${step === 2 ? "bg-kinal-red" : "bg-gray-200"}`} />
            <span
              className={`w-8 h-8 flex items-center justify-center rounded-full font-black text-sm ${
                step === 2 ? "bg-kinal-red text-white" : "bg-gray-200 text-gray-400"
              }`}
            >
              2
            </span>
          </div>
        </div>

        {/* CUERPO con scroll */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1">

          {/* ── PASO 1: Cliente + Método de pago ── */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-5 animate-fadeIn">

              {/* Total resumen */}
              <div className="bg-orange-50 rounded-2xl p-5 border border-orange-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h3 className="text-xs font-black text-kinal-orange uppercase tracking-widest mb-1">
                    Total a Pagar
                  </h3>
                  <p className="text-3xl font-black text-kinal-red leading-none">
                    Q {total.toFixed(2)}
                  </p>
                </div>
                <div className="text-left sm:text-right text-xs font-bold text-gray-500">
                  <p>Sub: Q {subtotal.toFixed(2)}</p>
                  <p>IVA: Q {iva.toFixed(2)}</p>
                </div>
              </div>

              {/* Datos de facturación */}
              <div className="relative bg-white border border-gray-200 p-5 rounded-2xl shadow-sm space-y-4">
                <div className="flex justify-between items-end">
                  <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest">
                    Datos de Facturación
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreatingClient(!isCreatingClient);
                      setSelectedClient(isCreatingClient ? null : null);
                      setSearchTerm("");
                    }}
                    className="text-xs font-bold text-kinal-orange hover:underline shrink-0 ml-2"
                  >
                    {isCreatingClient ? "← Volver a buscar" : "+ Nuevo Cliente"}
                  </button>
                </div>

                {!isCreatingClient ? (
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Buscar por nombre o correo..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        if (selectedClient) setSelectedClient(null);
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-gray-50 text-sm"
                    />
                    {/* Dropdown de resultados */}
                    {searchTerm.length > 0 && !selectedClient && (
                      <div className="absolute z-[110] bg-white border rounded-xl w-full shadow-2xl max-h-48 overflow-y-auto mt-1">
                        {filteredClients.length > 0 ? filteredClients.map((client) => (
                          <div
                            key={client._id || client.uid}
                            className="p-4 hover:bg-orange-50 cursor-pointer border-b border-gray-50 last:border-none"
                            onClick={() => {
                              setSelectedClient(client);
                              setSearchTerm(`${client.UserName} ${client.UserSurname}`);
                            }}
                          >
                            <p className="font-bold text-gray-800 text-sm">
                              {client.UserName} {client.UserSurname}
                            </p>
                            <p className="text-xs text-gray-500">{client.UserEmail}</p>
                          </div>
                        )) : (
                          <div className="p-4 text-sm text-gray-400 font-bold text-center">
                            Sin resultados
                          </div>
                        )}
                      </div>
                    )}
                    {/* Cliente seleccionado */}
                    {selectedClient && (
                      <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-xl flex justify-between items-center">
                        <p className="text-sm font-bold text-green-700">
                          Seleccionado: {selectedClient.UserName} {selectedClient.UserSurname}
                        </p>
                        <button
                          type="button"
                          onClick={() => { setSelectedClient(null); setSearchTerm(""); }}
                          className="text-green-900 text-xs font-black shrink-0 ml-2"
                        >
                          CAMBIAR
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Formulario nuevo cliente */
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fadeIn bg-orange-50 p-4 rounded-xl border border-orange-100">
                    <input
                      type="text"
                      placeholder="Nombres"
                      required
                      value={newClient.UserName}
                      onChange={(e) => setNewClient({ ...newClient, UserName: e.target.value })}
                      className="px-4 py-2.5 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-kinal-orange text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Apellidos"
                      required
                      value={newClient.UserSurname}
                      onChange={(e) => setNewClient({ ...newClient, UserSurname: e.target.value })}
                      className="px-4 py-2.5 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-kinal-orange text-sm"
                    />
                    <input
                      type="email"
                      placeholder="Correo electrónico"
                      required
                      value={newClient.UserEmail}
                      onChange={(e) => setNewClient({ ...newClient, UserEmail: e.target.value })}
                      className="sm:col-span-2 px-4 py-2.5 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-kinal-orange text-sm"
                    />
                  </div>
                )}
              </div>

              {/* Método de pago */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700">Método de Pago</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("CASH")}
                    className={`p-4 rounded-xl border-2 font-black uppercase transition-all flex items-center justify-center gap-2 text-sm ${
                      paymentMethod === "CASH"
                        ? "border-kinal-red bg-red-50 text-kinal-red"
                        : "border-gray-100 text-gray-400"
                    }`}
                  >
                    <img src={CashIcon} alt="Cash" className="w-5 h-5 shrink-0" />
                    Efectivo
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("CARD")}
                    className={`p-4 rounded-xl border-2 font-black uppercase transition-all flex items-center justify-center gap-2 text-sm ${
                      paymentMethod === "CARD"
                        ? "border-kinal-red bg-red-50 text-kinal-red"
                        : "border-gray-100 text-gray-400"
                    }`}
                  >
                    <img src={CardIcon} alt="Card" className="w-5 h-5 shrink-0" />
                    Tarjeta
                  </button>
                </div>
              </div>

              {/* Botones paso 1 */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 text-gray-500 font-bold hover:bg-gray-50 rounded-xl transition-colors border border-gray-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 bg-kinal-red text-white font-black px-8 py-3 rounded-xl shadow-lg hover:bg-red-700 transition-all uppercase tracking-widest"
                >
                  <span>Siguiente</span>
                  <img src={NextIcon} alt="Next" className="w-5 h-5 invert shrink-0" />
                </button>
              </div>
            </form>
          )}

          {/* ── PASO 2: Cobro ── */}
          {step === 2 && (
            <div className="space-y-5 animate-fadeIn">

              {/* EFECTIVO */}
              {paymentMethod === "CASH" && (
                <div className="space-y-5 text-center">
                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <p className="text-sm font-bold text-gray-500 uppercase">Monto a Cobrar</p>
                    <p className="text-4xl font-black text-gray-800">Q {total.toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col gap-2 max-w-sm mx-auto text-left">
                    <label className="text-sm font-bold text-gray-700">Efectivo Recibido</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={cashReceived}
                      onChange={(e) => setCashReceived(e.target.value)}
                      className="w-full px-6 py-4 text-2xl font-black text-center rounded-2xl border-2 border-green-200 focus:border-green-500 outline-none bg-green-50"
                    />
                  </div>
                  <div
                    className={`p-5 rounded-2xl border-2 ${
                      change > 0 ? "bg-green-100 border-green-300" : "bg-gray-50 border-gray-100"
                    }`}
                  >
                    <p className="text-sm font-bold text-gray-500 uppercase mb-1">Cambio</p>
                    <p className={`text-4xl font-black ${change > 0 ? "text-green-600" : "text-gray-300"}`}>
                      Q {change.toFixed(2)}
                    </p>
                  </div>
                </div>
              )}

              {/* TARJETA — vista visual interactiva */}
              {paymentMethod === "CARD" && (
                <div className="space-y-5">
                  {/* Tarjeta visual */}
                  <div className="relative w-full max-w-sm mx-auto h-44 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 text-white p-6 shadow-2xl overflow-hidden select-none">
                    {/* Chip decorativo */}
                    <div className="absolute top-5 left-6 w-10 h-7 rounded-md bg-yellow-400/80 border border-yellow-300" />
                    {/* Número */}
                    <div className="absolute top-16 left-6 right-6 flex justify-between font-mono text-lg tracking-widest">
                      {cardGroups.map((group, i) => (
                        <span key={i}>{group}</span>
                      ))}
                    </div>
                    {/* Nombre y vencimiento */}
                    <div className="absolute bottom-5 left-6 right-6 flex justify-between items-end">
                      <div>
                        <p className="text-[9px] text-gray-400 uppercase">Titular</p>
                        <p className="text-sm font-bold uppercase truncate max-w-[160px]">
                          {cardData.name || "NOMBRE APELLIDO"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] text-gray-400 uppercase">Vence</p>
                        <p className="text-sm font-bold font-mono">
                          {cardData.expiry || "MM/AA"}
                        </p>
                      </div>
                    </div>
                    {/* Decoración de fondo */}
                    <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-white/5" />
                    <div className="absolute -right-4 -bottom-12 w-32 h-32 rounded-full bg-white/5" />
                  </div>

                  {/* Formulario de tarjeta */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="number"
                      placeholder="Número de Tarjeta"
                      value={cardData.number}
                      onChange={handleCardChange}
                      className="sm:col-span-2 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-kinal-red font-mono text-sm"
                    />
                    <input
                      type="text"
                      name="name"
                      placeholder="Nombre en Tarjeta"
                      value={cardData.name}
                      onChange={handleCardChange}
                      className="sm:col-span-2 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-kinal-red uppercase text-sm"
                    />
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/AA"
                      value={cardData.expiry}
                      onChange={handleCardChange}
                      className="px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-kinal-red text-center text-sm"
                    />
                    <input
                      type={isCvvFocused ? "text" : "password"}
                      name="cvv"
                      placeholder="CVV"
                      value={cardData.cvv}
                      onChange={handleCardChange}
                      onFocus={() => setIsCvvFocused(true)}
                      onBlur={() => setIsCvvFocused(false)}
                      className="px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-kinal-red text-center font-mono text-sm"
                    />
                  </div>
                </div>
              )}

              {/* Botones paso 2 */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3 border-t border-gray-100 mt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-4 text-gray-500 font-bold hover:bg-gray-50 rounded-xl transition-colors border border-gray-200"
                >
                  Volver
                </button>
                <button
                  type="button"
                  onClick={handleConfirmPayment}
                  disabled={
                    loading ||
                    (paymentMethod === "CASH" && parseFloat(cashReceived || 0) < total)
                  }
                  className={`flex-1 font-black px-8 py-4 rounded-xl shadow-lg transition-all uppercase tracking-widest ${
                    loading
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  {loading ? "Procesando..." : `Confirmar Pago • Q ${total.toFixed(2)}`}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};