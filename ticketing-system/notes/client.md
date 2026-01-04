
# Navbar
    - z-50 to place div on the top of the UI
    - {...} curly barces means js inside jsx or any loop, condition
    - navLinks.map((link) => { ... }) here each entry including name, path in an array navLinks is given key "link" 
    - const isActive = pathname === link.href; here pathname is current url and link.href if from the array navLinks if they matches isActive is set true
    - duration-300 means 0.3 sec
    - md medium lg large
    - mx- margin x-axis i.e. left right
    - px=4 padding x-axis 1rem
    - <></> is used to wrap divs instead of <div></div>
    - max-h-80 === max-h-[320px]  1rem =16px and 1rem = h-4
    - overflow: hidden Any content that exceeds the element’s bounds (width or height) is clipped and not visible.
    - background/80  80% opacity
    - shadow-lg box giving large shadow 
    - backdrop-blur-md to give glassmorphism effect i.e affects the background behind the element
    -   useEffect(() => {
            document.documentElement.classList.toggle("dark", isDarkMode)
        }, [isDarkMode] 
    here document = whole DOM page global obj provided by browser documentElement = root element of html doc i.e. <html> classList = obj on every DOM that lets add, remove, toggle (add if not and remove if already added), check css classes on the class passed 

## UI
Label | Screen breakpoint | Screen type                    | max-w-*           | text-*
----- | ----------------- | ------------------------------ | ----------------- | ----------------
sm    | >= 640px          | Large mobile / small tablet    | 384px (24rem)     | 0.875rem (14px)
md    | >= 768px          | Tablet                         | 448px (28rem)     | 1rem (16px)
lg    | >= 1024px         | Small laptop                   | 512px (32rem)     | 1.125rem (18px)
xl    | >= 1280px         | Desktop                        | 576px (36rem)     | 1.25rem (20px)
2xl   | >= 1536px         | Large desktop                  | 672px (42rem)     | 1.5rem (24px)
3xl   | -                 | -                              | 768px (48rem)     | 1.875rem (30px)
7xl   | -                 | -                              | 1280px (80rem)    | 4.5rem (72px)


# Home.jsx
" const filteredTickets = selectedPriority
    ? tickets.filter((ticket) => ticket.priority === selectedPriority)
    : tickets
"
" {filteredTickets.slice(0, 3).map((ticket) => (
                <div
                  key={ticket._id}
                  className="p-6 rounded-lg bg-card border border-border hover:shadow-lg transition-shadow"
                >
"

here 
filteredTickets = array of tickets filtered 
.filter((ticket) => ) ticket is added only when ticket.priority === selectedPriority
.slice(0,3) = shows top 3 tickets
.map((ticket) => ()) = iterates over those 3 tickets and returns a jsx ui

- inline-block as inline it does not start from new line but as block height, width, margin, etc can be set
- ${getPriorityColor(ticket.priority)} this returns a css styling which is applied directly inside className 
- {filteredTickets.length === 0 && (
    <p> className="text-gray-500 col-span-full">No recent tickets available.</p>
    )} 
    here if array is empty then p is rendered 
    as for desktop view there are 3 cols used thus here col-span-full is used to place it center nicely when empty
- space-y-6 same as gap vertically
