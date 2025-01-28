// 'use client'

// import { useEffect, useState } from 'react'
// import Image from 'next/image'
// import AccountImage from '@/public/images/user-avatar-80.png'
// import { useAlert } from '@/app/contexts/alertContext'
// import { getCustomers, getPaymentPlans, assignItemToCustomer, assignPaymentPlanToItem } from '../../../services/inventoryService'
// import { CustomerInterface, PaymentPlanInterface } from '../../../types'

// export default function AccountPanel({ itemId, itemData }: { itemId: string, itemData:any }) {
//     const { alert } = useAlert()
//     const [loading, setLoading] = useState(true)
//     const [customers, setCustomers] = useState<CustomerInterface[]>([])
//     const [paymentPlans, setPaymentPlans] = useState<PaymentPlanInterface[]>([])

//     // Form states
//     const [selectedCustomer, setSelectedCustomer] = useState<string>('')
//     const [selectedPaymentPlan, setSelectedPaymentPlan] = useState<string>('')
//     const [currentAssignedCustomer, setCurrentAssignedCustomer] = useState<string>('')
//     const [currentPaymentPlan, setCurrentPaymentPlan] = useState<string>('')

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // Fetch initial data
//                 const [customersData, paymentPlansData] = await Promise.all([
//                     getCustomers(),
//                     getPaymentPlans(),
//                     // Add fetch current assignments here if you have an endpoint
//                 ])

//                 setCustomers(customersData)
//                 setPaymentPlans(paymentPlansData)

//                 // Set initial form values if editing existing assignments
//                 // You'll need to implement this based on your API
//                 // setCurrentAssignedCustomer(existingCustomerId)
//                 // setCurrentPaymentPlan(existingPaymentPlanId)

//             } catch (error) {
//                 console.error('Error fetching data:', error)
//                 alert({ text: 'Failed to load data', type: 'error' })
//             } finally {
//                 setLoading(false)
//             }
//         }

//         fetchData()
//     }, [itemId])

//     console.log(itemData, "-------Item Data-----")
    
//     const handleCustomerAssignment = async (e: React.FormEvent) => {
//         e.preventDefault()
//         try {
//             await assignItemToCustomer({ item_id: parseInt(itemId), customer_id: parseInt(selectedCustomer) })
//             alert({ text: 'Customer assigned successfully', type: 'success' })
//             // Update local state or refetch data
//             setCurrentAssignedCustomer(selectedCustomer)
//         } catch (error) {
//             console.error('Assignment failed:', error)
//             alert({ text: 'Failed to assign customer', type: 'error' })
//         }
//     }

//     const handlePaymentPlanAssignment = async (e: React.FormEvent) => {
//         e.preventDefault()
//         try {
//             await assignPaymentPlanToItem({ item_id: parseInt(itemId), payment_plan_id: parseInt(selectedPaymentPlan) })
//             alert({ text: 'Payment plan assigned successfully', type: 'success' })
//             // Update local state or refetch data
//             setCurrentPaymentPlan(selectedPaymentPlan)
//         } catch (error) {
//             console.error('Assignment failed:', error)
//             alert({ text: 'Failed to assign payment plan', type: 'error' })
//         }
//     }

//     if (loading) return <div>Loading...</div>

//     return (
//         <div className="grow">
//             <div className="p-6 space-y-6">
//                 <h2 className="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-5">Item Account</h2>
//                 <section>
//                     <div className="flex items-center">
//                         <div className="mr-4">
//                             <Image className="w-20 h-20 rounded-full" src={AccountImage} width={80} height={80} alt="User upload" />
//                         </div>
//                     </div>
//                 </section>
//                 {/* Customer Assignment Section */}
//                 <section>
//                     <h2 className="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mb-1">
//                         {currentAssignedCustomer ? 'Update Customer' : 'Assign Customer'}
//                     </h2>
//                     <div className="text-sm">Assign/update customer for this item</div>

//                     <form onSubmit={handleCustomerAssignment}>
//                         <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
//                             <div className="sm:w-1/2">
//                                 <label className="block text-sm font-medium mb-1">Customer</label>
//                                 <select
//                                     className="form-select w-full"
//                                     value={selectedCustomer}
//                                     onChange={(e) => setSelectedCustomer(e.target.value)}
//                                     required
//                                 >
//                                     <option value="">Select Customer</option>
//                                     {customers.map(customer => (
//                                         <option key={customer.id} value={customer.id}>
//                                             {customer.name}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="sm:w-1/3">
//                                 <button
//                                     type="submit"
//                                     className="btn bg-green-500 hover:bg-green-600 text-white w-full mt-[25px]"
//                                 >
//                                     {currentAssignedCustomer ? 'Update' : 'Assign'}
//                                 </button>
//                             </div>
//                         </div>
//                     </form>
//                 </section>

//                 {/* Payment Plan Assignment Section */}
//                 <section>
//                     <h2 className="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mb-1">
//                         {currentPaymentPlan ? 'Update Payment Plan' : 'Assign Payment Plan'}
//                     </h2>
//                     <div className="text-sm">Assign/update payment plan for this item</div>

//                     <form onSubmit={handlePaymentPlanAssignment}>
//                         <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
//                             <div className="sm:w-1/2">
//                                 <label className="block text-sm font-medium mb-1">Payment Plan</label>
//                                 <select
//                                     className="form-select w-full"
//                                     value={selectedPaymentPlan}
//                                     onChange={(e) => setSelectedPaymentPlan(e.target.value)}
//                                     required
//                                 >
//                                     <option value="">Select Payment Plan</option>
//                                     {paymentPlans.map(plan => (
//                                         <option key={plan.id} value={plan.id}>
//                                             {plan.name}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="sm:w-1/3">
//                                 <button
//                                     type="submit"
//                                     className="btn bg-green-500 hover:bg-green-600 text-white w-full mt-[25px]"
//                                 >
//                                     {currentPaymentPlan ? 'Update' : 'Assign'}
//                                 </button>
//                             </div>
//                         </div>
//                     </form>
//                 </section>
//             </div>
//         </div>
//     )
// }

'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import AccountImage from '@/public/images/user-avatar-80.png'
import { useAlert } from '@/app/contexts/alertContext'
import { getCustomers, getPaymentPlans, assignItemToCustomer, assignPaymentPlanToItem } from '../../../services/inventoryService'
import { CustomerInterface, PaymentPlanInterface } from '../../../types'

export default function AccountPanel({ itemId, itemData }: { itemId: string, itemData: any }) {
    const { alert } = useAlert()
    const [loading, setLoading] = useState(true)
    const [customers, setCustomers] = useState<CustomerInterface[]>([])
    const [paymentPlans, setPaymentPlans] = useState<PaymentPlanInterface[]>([])

    // Form states
    const [selectedCustomer, setSelectedCustomer] = useState<string>('')
    const [selectedPaymentPlan, setSelectedPaymentPlan] = useState<string>('')
    const [currentAssignedCustomer, setCurrentAssignedCustomer] = useState<string>('')
    const [currentPaymentPlan, setCurrentPaymentPlan] = useState<string>('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch initial data
                const [customersData, paymentPlansData] = await Promise.all([
                    getCustomers(),
                    getPaymentPlans(),
                ])

                setCustomers(customersData)
                setPaymentPlans(paymentPlansData)

                // Initialize form values from itemData
                if (itemData) {
                    const customerId = itemData.customer?.id?.toString() || ''
                    const paymentPlanId = itemData.payment_plan?.id?.toString() || ''
                    console.log(customerId, "customerId ------207----")
                    console.log(paymentPlanId, "PaymentPlanId ----- 208-----")
                    setCurrentAssignedCustomer(customerId)
                    setCurrentPaymentPlan(paymentPlanId)
                    setSelectedCustomer(customerId)
                    setSelectedPaymentPlan(paymentPlanId)
                }

            } catch (error) {
                console.error('Error fetching data:', error)
                alert({ text: 'Failed to load data', type: 'error' })
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [itemId, itemData])

    const handleCustomerAssignment = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await assignItemToCustomer({ item_id: parseInt(itemId), customer_id: parseInt(selectedCustomer) })
            alert({ text: 'Customer assigned successfully', type: 'success' })
            setCurrentAssignedCustomer(selectedCustomer)
        } catch (error) {
            console.error('Assignment failed:', error)
            alert({ text: 'Failed to assign customer', type: 'error' })
        }
    }

    const handlePaymentPlanAssignment = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await assignPaymentPlanToItem({ item_id: parseInt(itemId), payment_plan_id: parseInt(selectedPaymentPlan) })
            alert({ text: 'Payment plan assigned successfully', type: 'success' })
            setCurrentPaymentPlan(selectedPaymentPlan)
        } catch (error) {
            console.error('Assignment failed:', error)
            alert({ text: 'Failed to assign payment plan', type: 'error' })
        }
    }

    if (loading) return <div>Loading...</div>

    console.log(currentAssignedCustomer, "customerId ------250----")
    console.log(currentPaymentPlan, "PaymentPlanId ----- 251-----")
    return (
        <div className="grow">
            <div className="p-6 space-y-6">
                <h2 className="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-5">Item Account</h2>
                
                {/* Customer Assignment Section */}
                <section>
                    <h2 className="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mb-1">
                        {currentAssignedCustomer ? 'Update Customer' : 'Assign Customer'}
                    </h2>
                    <div className="text-sm">Assign/update customer for this item</div>

                    <form onSubmit={handleCustomerAssignment}>
                        <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                            <div className="sm:w-1/2">
                                <label className="block text-sm font-medium mb-1">Customer</label>
                                <select
                                    className="form-select w-full"
                                    value={selectedCustomer}
                                    onChange={(e) => setSelectedCustomer(e.target.value)}
                                    required
                                >
                                    <option value="">Select Customer</option>
                                    {customers.map(customer => (
                                        <option key={customer.id} value={customer.id}>
                                            {customer.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="sm:w-1/3">
                                <button
                                    type="submit"
                                    className="btn bg-green-500 hover:bg-green-600 text-white w-full mt-[25px]"
                                >
                                    {currentAssignedCustomer ? 'Update' : 'Assign'}
                                </button>
                            </div>
                        </div>
                    </form>
                    
                    {currentAssignedCustomer && (
                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Currently assigned to: {
                                customers.find(c => c.id.toString() === currentAssignedCustomer)?.name || 'Unknown customer'
                            }
                        </div>
                    )}
                </section>

                {/* Payment Plan Assignment Section */}
                <section>
                    <h2 className="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mb-1">
                        {currentPaymentPlan ? 'Update Payment Plan' : 'Assign Payment Plan'}
                    </h2>
                    <div className="text-sm">Assign/update payment plan for this item</div>

                    <form onSubmit={handlePaymentPlanAssignment}>
                        <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                            <div className="sm:w-1/2">
                                <label className="block text-sm font-medium mb-1">Payment Plan</label>
                                <select
                                    className="form-select w-full"
                                    value={selectedPaymentPlan}
                                    onChange={(e) => setSelectedPaymentPlan(e.target.value)}
                                    required
                                >
                                    <option value="">Select Payment Plan</option>
                                    {paymentPlans.map(plan => (
                                        <option key={plan.id} value={plan.id}>
                                            {plan.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="sm:w-1/3">
                                <button
                                    type="submit"
                                    className="btn bg-green-500 hover:bg-green-600 text-white w-full mt-[25px]"
                                >
                                    {currentPaymentPlan ? 'Update' : 'Assign'}
                                </button>
                            </div>
                        </div>
                    </form>
                    
                    {currentPaymentPlan && (
                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Current payment plan: {
                                paymentPlans.find(p => p.id.toString() === currentPaymentPlan)?.name || 'Unknown plan'
                            }
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}