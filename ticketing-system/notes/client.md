
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
        }, [isDarkMode])
    here document = whole DOM page global obj provided by browser documentElement = root element of html doc i.e. <html> classList = obj on every DOM that lets add, remove, toggle (add if not and remove if already added), check css classes on the class passed 
    - isActive = boolean used for url to match the path if active used for NavLink
    - Add group to the parent with group-hover variants on children this is used to add direct style to a child when parent is hovered
    - "<div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative text-sm font-medium transition-colors group ${
                    isActive ? "text-primary" : "text-foreground hover:text-red-700 opacity-70 hover:opacity-100"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    <span
                      className={`absolute left-0 bottom-0 h-0.5 bg-primary transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>" here initially nav is hidden but for >=md it is visible as links navlink is relative and span i.e. underline is absolute to position under the text when navlink inactive but hovered it goes dark black and added underline

          -

# Sidebar
- <aside> is it same as div expect it is semantic html element, represents secondary content which is related to main content
- "export default function Sidebar({ onFilterChange }) {...}
      
        const handlePriorityClick = (priority) => {
        setActivePriority(priority)
        if (onFilterChange) {
          onFilterChange(priority)
        }
      }
"
here onFilterChange is the props from parent Home to child Sidebar and child is using this func and the value of priority is passed as an argument when calling the callback func to the parent

- " if (onFilterChange) {
      onFilterChange(priority)
    }" it is checking if any prop is passed if yes then same data is passed to the parent because sidebar is used to just select the priority and home uses it to show the relevant tickets
  
- top=16  h-[calc(100vh-4rem)]  sidebar starts from 4rem (height of navbar) and it is tall 100vh minus 4rem which is calculated dynamically
- z-40 below navbar as it was z-50 closest to the viewport
- aria-label to set the label for the button here
- -right-6 means -6 from right
- absolute (w.r.t parent) left-full span exactly to the right edge of the button top=1/2 move span down to 50% height of button
- whitespace-nowrap prevents text from wrapping i.e. set in one line
- pointer-events-none this is for span that on click, hover, etc events are valid on the label text appearing
- overflow-y: auto is content overflows gives scrollbar
- shrink-0 does not shrink has same size shrink-1 can shrink
- "if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
    setIsCollapsed(true)
}
"
  sidebarRef.current → This is a reference to the sidebar DOM element.

  !sidebarRef.current.contains(event.target) → Checks if the element that was clicked (event.target) is outside the sidebar.
- ref={sidebarRef} to tell react this aside element is the sidebar so that react checks if the click is outside the sidebar or not
- 




# CreateTicket.jsx
- "  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }" here [] means key ...formData is a spread operator used to keep already set values and adds new values to the keys present. here formData is like a map which has key-value pairs already defined we set key with e.target.name e.g. email and value to it is set using e.target.value e.g. abc@gmail.com"
  - variant="contained" this is MUI prop, gives the button a solid background
  -  label="Status" to tell MUI to leave some space for label
  - "{new Date(ticket.date).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}" 
here "ticket.date" is the date of ticket creation, "Date" is builtin js object(class) to work with dates and times, "new Date()" is used to make new object of Date, ".toLocalDateString()" is one of the methods provided by Date


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
