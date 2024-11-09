"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, ShoppingCart } from "lucide-react"

interface Product {
  id: number
  title: string
  price: number
  category: string
  description: string
  image: string
}

export default function EnhancedFakeStore() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("default")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products')
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data: Product[] = await response.json()
        setProducts(data)
        setFilteredProducts(data)
      } catch (err) {
        setError('Error fetching products. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    let filtered = products.filter(product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "all" || product.category === selectedCategory)
    )

    switch (sortBy) {
      case "priceLowToHigh":
        filtered = filtered.sort((a, b) => a.price - b.price)
        break
      case "priceHighToLow":
        filtered = filtered.sort((a, b) => b.price - a.price)
        break
      case "nameAZ":
        filtered = filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "nameZA":
        filtered = filtered.sort((a, b) => b.title.localeCompare(a.title))
        break
      default:
        // Keep original order
        break
    }

    setFilteredProducts(filtered)
  }, [searchTerm, selectedCategory, sortBy, products])

  const categories = ["all", ...Array.from(new Set(products.map(product => product.category)))]

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  )

  if (error) return <p className="text-red-500 text-center">{error}</p>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Enhanced Fake Store</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-1/3"
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="md:w-1/3">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="md:w-1/3">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
            <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
            <SelectItem value="nameAZ">Name: A-Z</SelectItem>
            <SelectItem value="nameZA">Name: Z-A</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <Card key={product.id} className="flex flex-col justify-between">
            <CardHeader>
              <div className="aspect-square relative mb-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-contain w-full h-full"
                />
              </div>
              <CardTitle className="line-clamp-1">{product.title}</CardTitle>
              <CardDescription className="line-clamp-2">{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground mt-2">{product.category}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <p className="text-center mt-8 text-lg">No products found.</p>
      )}
    </div>
  )
}