import { useState } from "react";
import { useBillingStore } from "../../../features/users/store/adminStore";

// --- IMPORTACIÓN DE TUS ICONOS ---
import CashIcon from "../../../assets/icons/Cash.svg";
import CardIcon from "../../../assets/icons/CreditCard.svg";
import NextIcon from "../../../assets/icons/Next.svg";

export const PaymentWizardModal = ({
  isOpen,
  onClose,
  orderData,
}) => {

  const payBilling = useBillingStore(
    (state) => state.payBilling
  );

  // --- ESTADOS DEL WIZARD ---
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] =
    useState("CASH");
  const [loading, setLoading] = useState(false);

  // --- MOCK TEMPORAL DE CLIENTES ---
  const mockUsers = [
    {
      _id: "CF00000001",
      UserName: "Consumidor",
      UserSurname: "Final",
      UserEmail: "cf@kfc.com.gt"
    },
    {
      _id: "U00000002",
      UserName: "Roberto",
      UserSurname: "Milian",
      UserEmail: "roberto@kinal.edu.gt"
    },
    {
      _id: "U00000003",
      UserName: "Diego",
      UserSurname: "López",
      UserEmail: "dlopez@gmail.com"
    }
  ];

  // --- ESTADOS CLIENTE ---
  const [searchQuery, setSearchQuery] =
    useState("");
  const [selectedClient, setSelectedClient] =
    useState(mockUsers[0]);
  const [isCreatingClient, setIsCreatingClient] =
    useState(false);
  const [newClient, setNewClient] = useState({
    UserName: "",
    UserSurname: "",
    UserEmail: ""
  });

  // --- EFECTIVO ---
  const [cashReceived, setCashReceived] =
    useState("");

  // --- TARJETA ---
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });

  const [isCvvFocused, setIsCvvFocused] =
    useState(false);

  if (!isOpen || !orderData) return null;

  // --- FACTURA ---
  const total = Number(orderData.BillTotal || 0);
  const subtotal = Number(orderData.BillSubtotal || 0);
  const iva = Number(orderData.BillIVA || 0);

  const change =
    parseFloat(cashReceived) >= total
      ? parseFloat(cashReceived) - total
      : 0;

  // --- SIGUIENTE PASO ---
  const handleNextStep = (e) => {
    e.preventDefault();

    if (!selectedClient && !isCreatingClient) {
      alert(
        "Por favor selecciona o crea un cliente."
      );
      return;
    }

    setStep(2);
  };

  // --- BUSCADOR CLIENTE ---
  const handleSearchClient = (value) => {

    setSearchQuery(value);

    const found = mockUsers.find(
      (u) =>
        u.UserName
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        u.UserEmail
          .toLowerCase()
          .includes(value.toLowerCase())
    );

    if (found) {
      setSelectedClient(found);
      setIsCreatingClient(false);
    } else {
      setSelectedClient(null);
    }
  };

  // --- CONFIRMAR PAGO ---
  const handleConfirmPayment = async () => {
    try {
      setLoading(true);
      await payBilling(orderData._id);
      alert(
        "Pago procesado correctamente"
      );
      setStep(1);
      setSearchQuery("");
      setCashReceived("");
      setIsCreatingClient(false);
      onClose();
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
        "Error al procesar el pago"
      );
    } finally {
      setLoading(false);
    }
  };

  // --- INPUT TARJETA ---
  const handleCardChange = (e) => {
    const { name, value } = e.target;
    if (name === "number") {
      const onlyNumbers =
        value.replace(/\D/g, "");
      const formattedNumber =
        onlyNumbers.replace(
          /(\d{4})(?=\d)/g,
          "$1 "
        );

      if (formattedNumber.length <= 19) {
        setCardData({
          ...cardData,
          [name]: formattedNumber
        });
      }

    } else if (name === "expiry") {
      const onlyNumbers =
        value.replace(/\D/g, "");
      let formattedExpiry = onlyNumbers;
      if (onlyNumbers.length > 2) {
        formattedExpiry =
          `${onlyNumbers.slice(0, 2)}/${onlyNumbers.slice(2, 4)}`;
      }

      setCardData({
        ...cardData,
        [name]: formattedExpiry
      });

    } else if (name === "cvv") {
      const onlyNumbers =
        value.replace(/\D/g, "");

      if (onlyNumbers.length <= 3) {
        setCardData({
          ...cardData,
          [name]: onlyNumbers
        });
      }

    } else {
      setCardData({
        ...cardData,
        [name]: value.toUpperCase()
      });

    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* HEADER */}
        <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black italic text-gray-800 uppercase">
              Procesar{" "}
              <span className="text-kinal-red">
                Pago
              </span>
            </h2>
            <p className="text-sm font-bold text-gray-400">
              Factura:{" "}
              {orderData.BillSerie}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`w-8 h-8 flex items-center justify-center rounded-full font-black text-sm ${step === 1
                  ? "bg-kinal-red text-white"
                  : "bg-green-100 text-green-600"
                }`}
            >
              1
            </span>
            <div
              className={`w-8 h-1 rounded-full ${step === 2
                  ? "bg-kinal-red"
                  : "bg-gray-200"
                }`}
            />
            <span
              className={`w-8 h-8 flex items-center justify-center rounded-full font-black text-sm ${step === 2
                  ? "bg-kinal-red text-white"
                  : "bg-gray-200 text-gray-400"
                }`}
            >
              2
            </span>
          </div>
        </div>
        <div className="p-8 overflow-y-auto">

          {/* PASO 1 */}
          {step === 1 && (
            <form
              onSubmit={handleNextStep}
              className="space-y-6 animate-fadeIn"
            >
              {/* TOTAL */}
              <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100 flex justify-between items-center">
                <div>
                  <h3 className="text-xs font-black text-kinal-orange uppercase tracking-widest mb-1">
                    Total a Pagar
                  </h3>
                  <p className="text-3xl font-black text-kinal-red leading-none">
                    Q {total.toFixed(2)}
                  </p>
                </div>
                <div className="text-right text-xs font-bold text-gray-500">
                  <p>
                    Sub: Q {subtotal.toFixed(2)}
                  </p>
                  <p>
                    IVA: Q {iva.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* CLIENTE */}
              <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm space-y-4">
                <div className="flex justify-between items-end mb-2">
                  <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest">
                    Datos de Facturación
                  </h3>
                  {!isCreatingClient && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsCreatingClient(true);
                        setSelectedClient(null);
                      }}
                      className="text-xs font-bold text-kinal-orange hover:underline"
                    >
                      + Crear Nuevo Cliente
                    </button>
                  )}
                </div>
                {!isCreatingClient ? (
                  <div className="flex flex-col gap-1">
                    <input
                      type="text"
                      placeholder="Buscar cliente..."
                      value={searchQuery}
                      onChange={(e) =>
                        handleSearchClient(
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-gray-50"
                    />
                    {selectedClient && (
                      <div className="mt-2 p-3 bg-green-50 border border-green-100 rounded-lg flex items-center justify-between">
                        <div>
                          <p className="text-sm font-black text-green-800">
                            {selectedClient.UserName}{" "}
                            {selectedClient.UserSurname}
                          </p>
                          <p className="text-xs font-bold text-green-600">
                            {selectedClient.UserEmail}
                          </p>
                        </div>
                        <span className="bg-green-200 text-green-800 text-[10px] px-2 py-1 rounded-full font-black">
                          SELECCIONADO
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 animate-fadeIn bg-orange-50 p-4 rounded-xl border border-orange-100">
                    <input
                      type="text"
                      placeholder="Nombres"
                      required
                      value={newClient.UserName}
                      onChange={(e) =>
                        setNewClient({
                          ...newClient,
                          UserName:
                            e.target.value
                        })
                      }
                      className="px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-kinal-orange"
                    />
                    <input
                      type="text"
                      placeholder="Apellidos"
                      required
                      value={newClient.UserSurname}
                      onChange={(e) =>
                        setNewClient({
                          ...newClient,
                          UserSurname:
                            e.target.value
                        })
                      }
                      className="px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-kinal-orange"
                    />
                    <input
                      type="email"
                      placeholder="Correo"
                      required
                      value={newClient.UserEmail}
                      onChange={(e) =>
                        setNewClient({
                          ...newClient,
                          UserEmail:
                            e.target.value
                        })
                      }
                      className="col-span-2 px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-kinal-orange"
                    />
                  </div>
                )}
              </div>
              {/* MÉTODO */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700">
                  Método de Pago
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      setPaymentMethod("CASH")
                    }
                    className={`p-4 rounded-xl border-2 font-black uppercase transition-all flex items-center justify-center gap-2 ${paymentMethod === "CASH"
                        ? "border-kinal-red bg-red-50 text-kinal-red"
                        : "border-gray-100 text-gray-400"
                      }`}
                  >
                    <img
                      src={CashIcon}
                      alt="Cash"
                      className="w-6 h-6"
                    />
                    Efectivo
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setPaymentMethod("CARD")
                    }
                    className={`p-4 rounded-xl border-2 font-black uppercase transition-all flex items-center justify-center gap-2 ${paymentMethod === "CARD"
                        ? "border-kinal-red bg-red-50 text-kinal-red"
                        : "border-gray-100 text-gray-400"
                      }`}
                  >
                    <img
                      src={CardIcon}
                      alt="Card"
                      className="w-6 h-6"
                    />
                    Tarjeta
                  </button>
                </div>
              </div>
              {/* BOTONES */}
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 text-gray-500 font-bold hover:bg-gray-50 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-kinal-red text-white font-black px-8 py-3 rounded-xl shadow-lg hover:bg-red-700 transition-all uppercase tracking-widest"
                >
                  <span>Siguiente</span>
                  <img
                    src={NextIcon}
                    alt="Next"
                    className="w-5 h-5 invert"
                  />
                </button>
              </div>
            </form>
          )}
          {/* PASO 2 */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              {paymentMethod === "CASH" ? (
                <div className="space-y-6 text-center">
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 inline-block w-full">
                    <p className="text-sm font-bold text-gray-500 uppercase">
                      Monto a Cobrar
                    </p>
                    <p className="text-4xl font-black text-gray-800">
                      Q {total.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 max-w-sm mx-auto text-left">
                    <label className="text-sm font-bold text-gray-700">
                      Efectivo Recibido
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={cashReceived}
                      onChange={(e) =>
                        setCashReceived(
                          e.target.value
                        )
                      }
                      className="w-full px-6 py-4 text-2xl font-black text-center rounded-2xl border-2 border-green-200 focus:border-green-500 outline-none bg-green-50"
                    />
                  </div>
                  <div className={`p-6 rounded-2xl border-2 ${change > 0
                      ? "bg-green-100 border-green-300"
                      : "bg-gray-50 border-gray-100"
                    }`}>
                    <p className="text-sm font-bold text-gray-500 uppercase mb-1">
                      Cambio
                    </p>
                    <p className={`text-4xl font-black ${change > 0
                        ? "text-green-600"
                        : "text-gray-300"
                      }`}>
                      Q {change.toFixed(2)}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="number"
                      placeholder="Número de Tarjeta"
                      value={cardData.number}
                      onChange={handleCardChange}
                      className="col-span-2 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-kinal-red font-mono"
                    />
                    <input
                      type="text"
                      name="name"
                      placeholder="Nombre en Tarjeta"
                      value={cardData.name}
                      onChange={handleCardChange}
                      className="col-span-2 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-kinal-red uppercase"
                    />
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      value={cardData.expiry}
                      onChange={handleCardChange}
                      className="px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-kinal-red text-center"
                    />
                    <input
                      type="password"
                      name="cvv"
                      placeholder="CVV"
                      value={cardData.cvv}
                      onChange={handleCardChange}
                      onFocus={() =>
                        setIsCvvFocused(true)
                      }
                      onBlur={() =>
                        setIsCvvFocused(false)
                      }
                      className="px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-kinal-red text-center font-mono"
                    />
                  </div>
                </div>
              )}

              {/* BOTONES */}
              <div className="pt-4 flex gap-3 border-t border-gray-100 mt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-4 text-gray-500 font-bold hover:bg-gray-50 rounded-xl transition-colors border border-gray-200"
                >
                  Volver
                </button>
                <button
                  type="button"
                  onClick={handleConfirmPayment}
                  disabled={
                    loading ||
                    (
                      paymentMethod === "CASH" &&
                      parseFloat(cashReceived || 0) < total
                    )
                  }
                  className={`flex-1 font-black px-8 py-4 rounded-xl shadow-lg transition-all uppercase tracking-widest ${loading
                      ? "bg-gray-300 text-gray-500"
                      : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                >
                  {loading
                    ? "Procesando..."
                    : `Confirmar Pago • Q ${total.toFixed(2)}`
                  }
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};