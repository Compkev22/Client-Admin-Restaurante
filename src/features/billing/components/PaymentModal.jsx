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

  useEffect(() => {
    if (isOpen) {
      getUsers();
    }
  }, [isOpen, getUsers]);

  const filteredClients = users.filter(
    (u) =>
      u.UserName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.UserSurname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.UserEmail?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [loading, setLoading] = useState(false);

  const [selectedClient, setSelectedClient] = useState(null);
  useEffect(() => {
    if (users.length > 0 && !selectedClient) {
      setSelectedClient(users[0]);
    }
  }, [users]);

  const [isCreatingClient, setIsCreatingClient] = useState(false);
  const [newClient, setNewClient] = useState({
    UserName: "",
    UserSurname: "",
    UserEmail: "",
  });

  const [cashReceived, setCashReceived] = useState("");
  const [cardData, setCardData] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [isCvvFocused, setIsCvvFocused] = useState(false);

  if (!isOpen || !orderData) return null;

  const rawTotal = Number(orderData.total || orderData.BillTotal || 0);
  const total = rawTotal;
  const subtotal = rawTotal / 1.12;
  const iva = rawTotal - subtotal;
  const change =
    parseFloat(cashReceived) >= total ? parseFloat(cashReceived) - total : 0;

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
      setStep(1);
      setSearchTerm("");
      setCashReceived("");
      setIsCreatingClient(false);
      onClose();
    } catch (error) {
      console.error(error);
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
      setCardData((prev) => ({ ...prev, number: formattedNumber }));
    } else {
      setCardData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ─── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl flex flex-col max-h-[92vh]">

        {/* Cabecera */}
        <div className="bg-gray-800 px-6 md:px-8 py-5 md:py-6 flex justify-between items-center text-white shrink-0 rounded-t-3xl">
          <div>
            <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-wider">
              {step === 1 ? "Seleccionar" : "Método de"}{" "}
              <span className="text-kinal-red">{step === 1 ? "Cliente" : "Pago"}</span>
            </h2>
            <p className="text-gray-400 font-mono text-xs md:text-sm mt-1">
              Paso {step} de 2 • Total: Q {total.toFixed(2)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-gray-400 hover:text-white font-bold text-xl transition-colors"
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>

        {/* Cuerpo con scroll */}
        <div className="overflow-y-auto flex-1 px-6 md:px-8 py-6">
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-black text-kinal-orange uppercase tracking-widest">
                  Buscar Cliente
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nombre, apellido o correo..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none font-bold text-gray-700"
                />
              </div>

              {!isCreatingClient && (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {filteredClients.map((u) => (
                    <button
                      key={u._id || u.uid}
                      type="button"
                      onClick={() => setSelectedClient(u)}
                      className={`w-full text-left px-4 py-3 rounded-xl border-2 font-bold text-sm transition-colors ${
                        selectedClient?._id === u._id
                          ? "border-kinal-red bg-red-50 text-kinal-red"
                          : "border-gray-100 hover:border-gray-300 text-gray-700"
                      }`}
                    >
                      {u.UserName} {u.UserSurname}
                      <span className="text-xs font-normal text-gray-400 ml-2">{u.UserEmail}</span>
                    </button>
                  ))}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingClient((prev) => !prev);
                    setSelectedClient(null);
                  }}
                  className="text-xs font-black text-kinal-orange underline"
                >
                  {isCreatingClient ? "← Seleccionar cliente existente" : "+ Crear nuevo cliente"}
                </button>
              </div>

              {isCreatingClient && (
                <div className="space-y-3 bg-orange-50 p-4 rounded-2xl border border-orange-100">
                  {["UserName", "UserSurname", "UserEmail"].map((field) => (
                    <input
                      key={field}
                      type={field === "UserEmail" ? "email" : "text"}
                      placeholder={field === "UserName" ? "Nombre" : field === "UserSurname" ? "Apellido" : "Correo"}
                      value={newClient[field]}
                      onChange={(e) => setNewClient((prev) => ({ ...prev, [field]: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none font-bold text-gray-700"
                    />
                  ))}
                </div>
              )}

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-kinal-red text-white font-black py-3 rounded-xl shadow-lg hover:bg-red-700 transition-all uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  Siguiente
                  <img src={NextIcon} alt="Siguiente" className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-6">
              {/* Método de pago */}
              <div className="space-y-2">
                <p className="text-xs font-black text-kinal-orange uppercase tracking-widest">
                  Método de Pago
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "CASH", label: "Efectivo", icon: CashIcon },
                    { value: "CARD", label: "Tarjeta", icon: CardIcon },
                  ].map(({ value, label, icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setPaymentMethod(value)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 font-black text-sm transition-colors ${
                        paymentMethod === value
                          ? "border-kinal-red bg-red-50 text-kinal-red"
                          : "border-gray-100 hover:border-gray-300 text-gray-500"
                      }`}
                    >
                      <img src={icon} alt={label} className="w-8 h-8" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Efectivo */}
              {paymentMethod === "CASH" && (
                <div className="space-y-1">
                  <label className="text-xs font-black text-kinal-orange uppercase tracking-widest">
                    Efectivo Recibido
                  </label>
                  <input
                    type="number"
                    value={cashReceived}
                    onChange={(e) => setCashReceived(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none font-bold text-gray-700"
                  />
                  {parseFloat(cashReceived) >= total && (
                    <p className="text-sm font-black text-green-600 mt-1">
                      Cambio: Q {change.toFixed(2)}
                    </p>
                  )}
                </div>
              )}

              {/* Tarjeta */}
              {paymentMethod === "CARD" && (
                <div className="space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <input
                    type="text"
                    name="number"
                    maxLength={19}
                    value={cardData.number}
                    onChange={handleCardChange}
                    placeholder="0000 0000 0000 0000"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none font-bold text-gray-700 tracking-widest"
                  />
                  <input
                    type="text"
                    name="name"
                    value={cardData.name}
                    onChange={handleCardChange}
                    placeholder="Nombre en la tarjeta"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none font-bold text-gray-700"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="expiry"
                      maxLength={5}
                      value={cardData.expiry}
                      onChange={handleCardChange}
                      placeholder="MM/AA"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none font-bold text-gray-700"
                    />
                    <input
                      type={isCvvFocused ? "text" : "password"}
                      name="cvv"
                      maxLength={4}
                      value={cardData.cvv}
                      onChange={handleCardChange}
                      onFocus={() => setIsCvvFocused(true)}
                      onBlur={() => setIsCvvFocused(false)}
                      placeholder="CVV"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none font-bold text-gray-700"
                    />
                  </div>
                </div>
              )}

              {/* Resumen */}
              <div className="bg-gray-50 rounded-2xl p-4 space-y-2 border border-gray-100">
                <div className="flex justify-between text-sm font-bold text-gray-500">
                  <span>Subtotal</span>
                  <span>Q {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-gray-500">
                  <span>IVA (12%)</span>
                  <span>Q {iva.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-black text-gray-800 border-t border-gray-200 pt-2 mt-1">
                  <span>Total</span>
                  <span className="text-kinal-red">Q {total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  Atrás
                </button>
                <button
                  type="button"
                  onClick={handleConfirmPayment}
                  disabled={loading}
                  className="flex-1 bg-kinal-red text-white font-black py-3 rounded-xl shadow-lg hover:bg-red-700 transition-all uppercase tracking-widest flex items-center justify-center"
                >
                  {loading ? "Procesando..." : "Confirmar Pago"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};