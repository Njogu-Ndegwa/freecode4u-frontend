// 'use client'
// import { useEffect, useState } from 'react'
// import { useAlert } from '@/app/contexts/alertContext'
// import { Clipboard, Check } from 'lucide-react'
// import { getCustomers, generateToken } from '../../../services/inventoryService'
// import type { CustomerInterface } from '../../../types'

// type TokenType = 'ADD_TIME' | 'SET_TIME' | 'DISABLE_PAYG' | 'COUNTER_SYNC'

// export default function AccountPanel({ itemId }: { itemId: string }) {
//     const { alert } = useAlert()
//     const [loading, setLoading] = useState(true)
//     const [customers, setCustomers] = useState<CustomerInterface[]>([])
//     const [tokenType, setTokenType] = useState<TokenType>('ADD_TIME')
//     const [tokenValue, setTokenValue] = useState('')
//     const [generatedToken, setGeneratedToken] = useState('')
//     const [copied, setCopied] = useState(false)

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const customersData = await getCustomers()
//                 setCustomers(customersData)
//             } catch (error) {
//                 console.error('Error fetching data:', error)
//                 alert({ text: 'Failed to load customers', type: 'error' })
//             } finally {
//                 setLoading(false)
//             }
//         }
//         fetchData()
//     }, [itemId])

//     const handleTokenGeneration = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//           const response = await generateToken({
//             item_id: parseInt(itemId),
//             token_type: tokenType,
//             token_value: Number(tokenValue)
//           });
          
//           setGeneratedToken(response.token);
//           alert({ text: response.detail, type: 'success' });
          
//         } catch (error) {
//           console.error('Token generation failed:', error);
//           alert({ text: 'Failed to generate token', type: 'error' });
//         }
//       };

//     const copyToClipboard = async () => {
//         await navigator.clipboard.writeText(generatedToken)
//         setCopied(true)
//         setTimeout(() => setCopied(false), 2000)
//     }

//     if (loading) return <div>Loading...</div>

//     return (
//         <div className="grow">
//             <div className="p-6 space-y-6">
//                 <h2 className="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-5">Code Generation</h2>
                
//                 <section>
//                     <h2 className="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mb-1">
//                         Generate Code
//                     </h2>
//                     <div className="text-sm">Choose a Token type and enter token value to generate a token</div>

//                     <form onSubmit={generateToken}>
//                         <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
//                             <div className="sm:w-1/2">
//                                 <label className="block text-sm font-medium mb-1">Token Type</label>
//                                 <select
//                                     className="form-select w-full"
//                                     value={tokenType}
//                                     onChange={(e) => setTokenType(e.target.value as TokenType)}
//                                     required
//                                 >
//                                     <option value="ADD_TIME">Add Time</option>
//                                     <option value="SET_TIME">Set Time</option>
//                                     <option value="DISABLE_PAYG">Disable PAYG</option>
//                                     <option value="COUNTER_SYNC">Counter Sync</option>
//                                 </select>
//                             </div>
//                             <div className="sm:w-1/2">
//                                 <label className="block text-sm font-medium mb-1">Token Value</label>
//                                 <input 
//                                     type="number"
//                                     className="form-input w-full"
//                                     value={tokenValue}
//                                     onChange={(e) => setTokenValue(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                         </div>
                        
//                         <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
//                             <div className="sm:w-1/2"></div>
//                             <div className="sm:w-1/2">
//                                 <button
//                                     type="submit"
//                                     className="btn bg-green-500 hover:bg-green-600 text-white w-full mt-[25px]"
//                                 >
//                                     Generate Token
//                                 </button>
//                             </div>
//                         </div>
//                     </form>

//                     {generatedToken && (
//                         <div className="mt-6">
//                             <label className="block text-sm font-medium mb-2">Generated Token</label>
//                             <div className="flex items-center gap-2">
//                                 <input
//                                     type="text"
//                                     value={generatedToken}
//                                     readOnly
//                                     className="form-input w-full"
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={copyToClipboard}
//                                     className="btn bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 p-2"
//                                 >
//                                     {copied ? (
//                                         <Check className="w-5 h-5 text-green-500" />
//                                     ) : (
//                                         <Clipboard className="w-5 h-5" />
//                                     )}
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </section>
//             </div>
//         </div>
//     )
// }


'use client'
import { useEffect, useState } from 'react'
import { useAlert } from '@/app/contexts/alertContext'
import { Clipboard, Check } from 'lucide-react'
import { generateToken } from '../../../services/inventoryService'

type TokenType = 'ADD_TIME' | 'SET_TIME' | 'DISABLE_PAYG' | 'COUNTER_SYNC'

export default function AccountPanel({ itemId }: { itemId: string }) {
    const { alert } = useAlert()
    const [loading, setLoading] = useState(false)
    const [tokenType, setTokenType] = useState<TokenType>('ADD_TIME')
    const [tokenValue, setTokenValue] = useState('')
    const [generatedData, setGeneratedData] = useState<{
        token: string
        token_type: string
        token_value: number
        max_count: number
    } | null>(null)
    const [copied, setCopied] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        
        try {
            const response = await generateToken({
                item_id: parseInt(itemId),
                token_type: tokenType,
                token_value: Number(tokenValue)
            })

            setGeneratedData({
                token: response.token,
                token_type: response.token_type,
                token_value: response.token_value,
                max_count: response.max_count
            })
            
            alert({ text: response.detail, type: 'success' })
        } catch (error) {
            console.error('Token generation failed:', error)
            alert({ text: 'Failed to generate token', type: 'error' })
        } finally {
            setLoading(false)
        }
    }

    const copyToClipboard = async () => {
        if (!generatedData) return
        await navigator.clipboard.writeText(generatedData.token)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="grow">
            <div className="p-6 space-y-6">
                <h2 className="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-5">Code Generation</h2>
                
                <section>
                    <h2 className="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mb-1">
                        Generate Code
                    </h2>
                    <div className="text-sm">Choose a Token type and enter token value to generate a token</div>

                    <form onSubmit={handleSubmit}>
                        <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                            <div className="sm:w-1/2">
                                <label className="block text-sm font-medium mb-1">Token Type</label>
                                <select
                                    className="form-select w-full"
                                    value={tokenType}
                                    onChange={(e) => setTokenType(e.target.value as TokenType)}
                                    required
                                >
                                    <option value="ADD_TIME">Add Time</option>
                                    <option value="SET_TIME">Set Time</option>
                                    <option value="DISABLE_PAYG">Disable PAYG</option>
                                    <option value="COUNTER_SYNC">Counter Sync</option>
                                </select>
                            </div>
                            <div className="sm:w-1/2">
                                <label className="block text-sm font-medium mb-1">Token Value</label>
                                <input 
                                    type="number"
                                    className="form-input w-full"
                                    value={tokenValue}
                                    onChange={(e) => setTokenValue(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                            <div className="sm:w-1/2"></div>
                            <div className="sm:w-1/2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`btn bg-green-500 hover:bg-green-600 text-white w-full mt-[25px] ${
                                        loading ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {loading ? 'Generating...' : 'Generate Token'}
                                </button>
                            </div>
                        </div>
                    </form>

                    {generatedData && (
                        <div className="mt-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Generated Token</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={generatedData.token}
                                        readOnly
                                        className="form-input w-full"
                                    />
                                    <button
                                        type="button"
                                        onClick={copyToClipboard}
                                        className="btn bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 p-2"
                                    >
                                        {copied ? (
                                            <Check className="w-5 h-5 text-green-500" />
                                        ) : (
                                            <Clipboard className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}