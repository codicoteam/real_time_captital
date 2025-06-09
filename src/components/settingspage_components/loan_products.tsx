import { useState, type ForwardRefExoticComponent, type RefAttributes } from "react";
import { Plus, Edit3, Trash2, Home, Briefcase, User, type LucideProps } from "lucide-react";

const LoanProducts = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Personal Loan", type: "Personal", rate: "15%", term: "12-48", amount: "₨10K-₨200K", icon: User },
    { id: 2, name: "Home Loan", type: "Mortgage", rate: "8.5%", term: "120-360", amount: "₨500K-₨5M", icon: Home },
    { id: 3, name: "Business Loan", type: "Commercial", rate: "12%", term: "24-84", amount: "₨100K-₨2M", icon: Briefcase }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "Personal",
    rate: "",
    minTerm: "",
    maxTerm: "",
    minAmount: "",
    maxAmount: ""
  });

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (editingId) {
      setProducts(prev => prev.map(p => p.id === editingId ? 
        { ...p, ...formData, term: `${formData.minTerm}-${formData.maxTerm}`, amount: `₨${formData.minAmount}-₨${formData.maxAmount}` } : p
      ));
    } else {
      setProducts(prev => [...prev, {
        id: Date.now(),
        ...formData,
        term: `${formData.minTerm}-${formData.maxTerm}`,
        amount: `₨${formData.minAmount}-₨${formData.maxAmount}`,
        icon: formData.type === "Personal" ? User : formData.type === "Mortgage" ? Home : Briefcase
      }]);
    }
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: "", type: "Personal", rate: "", minTerm: "", maxTerm: "", minAmount: "", maxAmount: "" });
  };

  const handleEdit = (product: { id: any; name: any; type: any; rate: any; term: any; amount: any; icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>; }) => {
    setFormData({
      name: product.name,
      type: product.type,
      rate: product.rate.replace('%', ''),
      minTerm: product.term.split('-')[0],
      maxTerm: product.term.split('-')[1],
      minAmount: product.amount.split('-')[0].replace('₨', '').replace('K', '000').replace('M', '000000'),
      maxAmount: product.amount.split('-')[1].replace('₨', '').replace('K', '000').replace('M', '000000')
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-orange-800">Loan Products</h3>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl text-sm font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {showForm && (
        <div className="mb-6 p-4 bg-orange-50 rounded-xl border border-orange-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="px-3 py-2 bg-white border border-orange-200 rounded-lg"
              required
            />
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
              className="px-3 py-2 bg-white border border-orange-200 rounded-lg"
            >
              <option value="Personal">Personal</option>
              <option value="Mortgage">Mortgage</option>
              <option value="Commercial">Commercial</option>
            </select>
            <input
              type="number"
              placeholder="Interest Rate (%)"
              value={formData.rate}
              onChange={(e) => setFormData(prev => ({ ...prev, rate: e.target.value }))}
              className="px-3 py-2 bg-white border border-orange-200 rounded-lg"
              required
            />
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min Term"
                value={formData.minTerm}
                onChange={(e) => setFormData(prev => ({ ...prev, minTerm: e.target.value }))}
                className="px-3 py-2 bg-white border border-orange-200 rounded-lg flex-1"
                required
              />
              <input
                type="number"
                placeholder="Max Term"
                value={formData.maxTerm}
                onChange={(e) => setFormData(prev => ({ ...prev, maxTerm: e.target.value }))}
                className="px-3 py-2 bg-white border border-orange-200 rounded-lg flex-1"
                required
              />
            </div>
            <input
              type="number"
              placeholder="Min Amount"
              value={formData.minAmount}
              onChange={(e) => setFormData(prev => ({ ...prev, minAmount: e.target.value }))}
              className="px-3 py-2 bg-white border border-orange-200 rounded-lg"
              required
            />
            <input
              type="number"
              placeholder="Max Amount"
              value={formData.maxAmount}
              onChange={(e) => setFormData(prev => ({ ...prev, maxAmount: e.target.value }))}
              className="px-3 py-2 bg-white border border-orange-200 rounded-lg"
              required
            />
          </div>
          <div className="flex space-x-2 mt-4">
            <button 
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg">
              {editingId ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={() => { setShowForm(false); setEditingId(null); }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {products.map((product) => {
          const IconComponent = product.icon;
          return (
            <div key={product.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-white/50 to-orange-50/30 rounded-xl border border-orange-200/30">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <IconComponent className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-orange-800">{product.name}</h4>
                  <p className="text-sm text-orange-600">{product.type}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-sm font-medium text-orange-800">{product.rate}</div>
                  <div className="text-xs text-orange-500">Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-orange-800">{product.term}m</div>
                  <div className="text-xs text-orange-500">Term</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-orange-800">{product.amount}</div>
                  <div className="text-xs text-orange-500">Amount</div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LoanProducts;