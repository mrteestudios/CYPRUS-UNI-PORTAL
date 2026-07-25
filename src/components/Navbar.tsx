import React, { useEffect, useState } from 'react';
import {
  Mic,
  GraduationCap,
  Calculator,
  BookOpen,
  MessageSquare,
  Compass,
  Sparkles,
  Sliders
} from 'lucide-react';

import { useLanguage } from '../lib/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { VoiceSettingsModal } from './VoiceSettingsModal';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenLiveVoice: () => void;
  isLiveActive: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenLiveVoice,
  isLiveActive,
}) => {

  const { t } = useLanguage();

  const [isVoiceSettingsOpen, setIsVoiceSettingsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);


  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);

  }, []);



  const navItems = [
    {
      id: 'overview',
      label: t.tabUniversities,
      icon: GraduationCap
    },
    {
      id: 'courses',
      label: t.tabCourses,
      icon: BookOpen
    },
    {
      id: 'calculator',
      label: t.tabCalculator,
      icon: Calculator
    },
    {
      id: 'guide',
      label: t.tabGuide,
      icon: Compass
    },
    {
      id: 'chat',
      label: t.tabChat,
      icon: MessageSquare
    },
  ];



  return (
    <>

<header
className={`
sticky top-0 z-50
transition-all duration-500
text-white

${
scrolled

?

"bg-[#071A2F]/95 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.35)] border-b border-white/10"

:

"bg-transparent backdrop-blur-md"

}

`}
>


<div
className={`
max-w-7xl mx-auto
px-6 lg:px-10

transition-all duration-500

${scrolled ? "py-2" : "py-5"}

`}
>


{/* TOP ROW */}

<div className="
flex
items-center
justify-between
gap-4
">



{/* LOGO */}

<div
onClick={() => setActiveTab('overview')}
className="
cursor-pointer
group
"
>


<span
className="
text-[10px]
uppercase
tracking-[0.3em]
font-bold
text-white/50
"
>
{t.portalTitle}
</span>



<div className="
flex
items-center
gap-2
">


<h1
className="
text-xl
sm:text-2xl
font-bold
tracking-tight
transition
group-hover:text-[#00E5FF]
"
>
{t.brandName}
</h1>



<span
className="
text-[9px]
uppercase
font-bold
tracking-widest
px-3
py-1
rounded-full

bg-gradient-to-r
from-[#00E5FF]
to-[#8B5CF6]

text-[#071A2F]

shadow-[0_0_20px_rgba(0,229,255,.45)]

animate-pulse
"
>
{t.voiceAiBadge}
</span>


</div>

</div>





{/* ACTION BUTTONS */}

<div
className="
flex
items-center
gap-3
"
>


<LanguageSwitcher />



<button

onClick={() => setIsVoiceSettingsOpen(true)}

className="
p-2.5
rounded-full
border
border-white/20

hover:border-[#00E5FF]

hover:bg-[#00E5FF]/10

transition
"

>

<Sliders className="w-4 h-4"/>

</button>





<button

onClick={onOpenLiveVoice}

className={`

group

flex
items-center
gap-2

px-4
py-2.5

rounded-full

text-xs
font-bold
uppercase
tracking-wider

transition-all
duration-300


${
isLiveActive

?

"bg-emerald-500 shadow-[0_0_25px_rgba(16,185,129,.6)]"

:

"btn-cta-coral hover:scale-105"

}

`}

>


<div className="relative">

<Mic className="w-4 h-4"/>


{!isLiveActive && (

<span
className="
absolute
top-0
right-0
w-2
h-2
rounded-full
bg-[#7CFC00]
animate-ping
"
/>

)}


</div>



<span className="hidden sm:block">

{
isLiveActive
?
t.liveActive
:
t.speakGemini
}

</span>



<Sparkles
className="
w-3
h-3
group-hover:rotate-12
transition
"
/>


</button>



</div>


</div>







{/* DESKTOP NAV */}

<nav
className="
hidden
lg:flex

justify-center

gap-10

mt-3

pt-3

border-t
border-white/10

"
>


{
navItems.map(item => {


const Icon = item.icon;

const active = activeTab === item.id;



return (

<button

key={item.id}

onClick={() => setActiveTab(item.id)}

className={`
relative

flex
items-center
gap-2

text-sm

font-semibold

transition-all

pb-3


${
active

?

"text-[#00E5FF]"

:

"text-white/60 hover:text-white"

}

`}

>


<Icon className="w-4 h-4"/>

{item.label}



{
active && (

<span
className="
absolute
bottom-0
left-0
right-0

h-[2px]

bg-[#00E5FF]

shadow-[0_0_15px_#00E5FF]

"
/>

)

}


</button>

)

})

}


</nav>







{/* MOBILE NAV */}

<div
className="
lg:hidden

flex

gap-6

overflow-x-auto

mt-3

pt-3

border-t
border-white/10

pb-2

"
>


{
navItems.map(item => (

<button

key={item.id}

onClick={() => setActiveTab(item.id)}

className={`

whitespace-nowrap

text-xs

font-bold


${
activeTab === item.id

?

"text-[#00E5FF]"

:

"text-white/60"

}

`}

>

{item.label}

</button>

))

}


</div>




</div>


</header>





<VoiceSettingsModal

isOpen={isVoiceSettingsOpen}

onClose={() => setIsVoiceSettingsOpen(false)}

/>


</>

);

};