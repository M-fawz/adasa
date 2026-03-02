
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, Calendar } from 'lucide-react';
import { useBlogStore } from '@/features/blog/state/blog.store';
import { useDirection } from '@/shared/lib/hooks/useDirection';
import { BlogPost } from '@/features/blog/types/blog.types';

export const FeaturedPostsSection = () => {
    const { t, i18n } = useTranslation();
    const dir = useDirection();
    const isRtl = dir === 'rtl';
    const lang = i18n.language as 'en' | 'ar';
    const { featuredPosts, fetchFeaturedPosts } = useBlogStore();

    useEffect(() => {
        fetchFeaturedPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (featuredPosts.length === 0) return null;

    // Split posts: 3 vertical items
    // Requirement:
    // LEFT column: 3 stacked “text cards”
    // RIGHT column: 3 stacked “image cards” matching each left card row

    // We need to render them in a specific grid.
    // The requirement says "2-column layout... Left column: 3 stacked text cards... Right column: 3 stacked image cards".
    // AND "Keep RTL arrow direction exactly as screenshot." - Screenshot shows Header on Right (RTL).
    // In RTL, "Left" column is visually on the Left?? Or is it swapped?
    // "Left column: 3 stacked text cards" -> In LTR this is Left. In RTL this is usually Right.
    // Let's look at the screenshot.
    // Screenshot shows:
    // Title on Right.
    // Cards: Image is on the Right (large), Text is on the Left.
    // Wait, the screenshot shows 3 ROWS. Each row has Text on Left and Image on Right.
    // "LEFT column: 3 stacked “text cards” ... RIGHT column: 3 stacked “image cards”"
    // This implies a grid where column 1 is text cards, column 2 is image cards.
    // In RTL, if we use standard grid, column 1 (start) would be on Right.
    // If the screenshot shows Images on the Right and Text on the Left, then in RTL:
    // Image Column is the "Start" column (Right side)? No. 
    // Let's re-read carefully: "LEFT column: 3 stacked text cards... RIGHT column: 3 stacked image cards".
    // If I use `grid-cols-2`, in RTL, the first child is on the Right.
    // So if "Text Cards" are the first child, they will be on the Right in RTL.
    // But the screenshot shows Text on Left, Image on Right.
    // So in RTL, we want [Text] [Image] -> [Left] [Right].
    // This means Text is "End" (Left) and Image is "Start" (Right) in RTL context?
    // Actually, usually in RTL: [Start] is Right, [End] is Left.
    // So Image (Start) | Text (End).
    // If the screenshot shows Text Left | Image Right.
    // Then Text is at the End, Image is at the Start.
    // So we should structure it: Image Column (Start/Right), Text Column (End/Left).
    // OR just use Flexbox with `flex-row-reverse` or strict LTR layout inside the container?
    // "On the right side (aligned to the right / RTL): ... Title" -> Correct for RTL.

    // Let's strictly follow "LEFT column" and "RIGHT column" description for the Grid.
    // "LEFT column ... RIGHT column".
    // The screenshot shows:
    // [Text Card] [Image Card]
    // [Text Card] [Image Card]
    // [Text Card] [Image Card]

    // So visually: Text is Left, Image is Right.
    // In RTL (Arabic), the layout is flipped. Start is Right.
    // If the user said "LEFT column: 3 stacked text cards", they are describing the VISUAL left.
    // In LTR, this is Start. in RTL, this is End.
    // So we want Text on Left (End in RTL), Image on Right (Start in RTL).
    // So the Grid should be `grid-cols-2`.
    // If we want Text on Left and Image on Right REGARDLESS of direction (or maybe it flips?):
    // "Keep RTL arrow direction exactly".
    // Usually RTL sites flip the layout. Image Right, Text Left is typical for "Image Start, Text End" in LTR.
    // Wait, in LTR "Image Start" is Left.
    // In RTL "Image Start" is Right.
    // So if we have [Image] [Text] in code:
    // LTR: Image Left, Text Right.
    // RTL: Image Right, Text Left.

    // The user description says:
    // "LEFT column: 3 stacked “text cards” ... RIGHT column: 3 stacked “image cards”"
    // If this description is describing the Resulting View, then:
    // Text is Left, Image is Right.
    // In RTL context (Arabic site), if Text is Left, that's the "End" side.
    // So the structure should be:
    // <div class="grid grid-cols-2">
    //   <div class="col-text">...</div>
    //   <div class="col-image">...</div>
    // </div>
    // In RTL, the first child (col-text) goes to the Right.
    // So we need `col-image` to be the first child if we want it on the Right?
    // OR we force `dir="ltr"` on the grid? No, that's bad.
    // OR we use absolute positioning? No.
    // OR we just assume the user wants standard RTL behavior which flips it?
    // "LEFT column: ... RIGHT column:" might be describing the English explanation.
    // Screenshot: Title is on Right. Image is on Right?
    // "Each row is: [Text Card] + [Image Card] in the same row height."
    // If I look at the screenshot provided in the prompt (I can't see it, but I see the link... wait I don't see the link, I see the description).
    // "Section Header (RIGHT SIDE - RTL) ... Title (big): 'مقالات مختارة'" -> Header is Right aligned.
    // "Left Side Button ... 'عرض الكل'" -> Button is Left aligned.
    // This confirms standard RTL header.
    // Now the grid.
    // If the screenshot matches the header:
    // Likely the content follows RTL flow: Right is "Start".
    // Users said: "LEFT column: Text cards... RIGHT column: Image cards".
    // If they are describing the visual output of the screenshot:
    // The user sees Text on Left, Image on Right.
    // This means in RTL (Right-to-Left), the "Start" (Right) has the Images, and "End" (Left) has the Text.
    // So the logical order is: Image Card, then Text Card.
    // BUT the user *also* said "LEFT column: 3 stacked text cards... RIGHT column: 3 stacked image cards".
    // Maybe they want me to implement 2 physical columns.
    // Let's implement 2 columns: TextColumn and ImageColumn.
    // If I place TextColumn first in DOM:
    // RTL: TextColumn (Right), ImageColumn (Left).
    // LTR: TextColumn (Left), ImageColumn (Right).
    // The user says "LEFT column: Text... RIGHT column: Image".
    // They might be describing the Desktop layout they want.
    // If they want Text on Left and Image on Right in RTL, that is "Inverted RTL" or "LTR-like".
    // However, looking at standard Arabic designs: Image on Right (Start), Text on Left (End) is common for "Media Object".
    // Additional clue: "Section Header (RIGHT SIDE - RTL)" -> Title on Right.
    // Usually content focuses on the Title side.
    // If Title is Right, maybe Text Should be Right?
    // "LEFT column: text cards" -> Maybe the user wants the Text to be on the Left (away from the title)?
    // That would be unique (Title Right, Content Left).
    // Let's assume the user described the VISUAL appearance in the screenshot.
    // Visual: Left=Text, Right=Image.
    // In RTL (Arabic), Left is the End. Right is the Start.
    // So logically: Start=Image, End=Text.

    // I will code it as:
    // <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-5">
    //    {/* Text Column - ordered second in RTL visually if it's first in DOM? No. */}
    //    {/* In RTL: Col 1 is Right. Col 2 is Left. */}
    //    {/* User wants: Left=Text, Right=Image. */}
    //    {/* So Col 2 = Text, Col 1 = Image. */}
    //    {/* So in DOM: ImageCol, then TextCol? */}
    //    {/* Wait, if I do: */}
    //    {/* <div1>Text</div1> <div2>Image</div2> */}
    //    {/* RTL: div1 (Right), div2 (Left). -> Text Right, Image Left. */}
    //    {/* This CONTRADICTS "LEFT column: text, RIGHT column: images". */}
    //    {/* So if I want Text Left and Image Right in RTL: */}
    //    {/* I need <div2>Text</div2> <div1>Image</div1> (visually 2 then 1) */}
    //    {/* OR I just swap the DOM order for RTL? */}
    //    {/* Or better, I simply put Text in the Left Column (physically left). */}
    //    {/* To put something physically Left in RTL, it needs to be the LAST column (or explicit grid-col-start). */}
    //    {/* Let's try to follow standard RTL: First col is Right. */}
    //    {/* User said "LEFT column: Text". This means the column on the physical left. */}
    //    {/* In RTL, the 2nd column is on the physical left. */}
    //    {/* So the 2nd child in DOM should be the Text Column. */}
    //    {/* The 1st child in DOM should be the Image Column. */}
    //    {/* So: <ImageCol /> <TextCol /> */}
    //    {/* Result in RTL: [ImageCol (Right)] [TextCol (Left)]. */}
    //    {/* Matches "RIGHT column: image, LEFT column: text". matches user description. */}
    //    {/* VERDICT: Image Column First in DOM, Text Column Second in DOM. */}

    // Wait, verify "User said LEFT column: text...".
    // User: "LEFT column: 3 stacked “text cards” ... RIGHT column: 3 stacked “image cards”"
    // User: "So each row is: [Text Card] + [Image Card] in the same row height."
    // If they read left-to-right (English prompt), [Text] + [Image] means Text then Image.
    // If they are describing the screenshot which is Arabic...
    // Let's check the Title desc: "Title (big): 'مقالات مختارة' ... On the right side".
    // If Title is Right, and user is explicitly saying "Text Card (LEFT COLUMN)", "Image Card (RIGHT COLUMN)".
    // They are being very specific about position.
    // Title Right. Image Right. Text Left.
    // This feels balanced.
    // So Plan: Text Column is visually Left. Image Column is visually Right.
    // In RTL, this means Image is Start, Text is End.
    // So DOM Order: Image, Text.
    // BUT! On Mobile: "stack each item vertically: image on top, text below".
    // If DOM is Image, Text. Mobile Stack (block) -> Image Top, Text Bottom.
    // This MATCHES the mobile requirement perfectly!
    // "Tablet/Mobile: ... image on top, text below".
    // So DOM Order MUST be: Image Card, Text Card.
    // And wrapper must be flex-col-reverse? No, natural order is Image, Text.
    // So:
    // Mobile: Image
    //         Text
    // Desktop (Grid/Flex):
    //    RTL: Image (Right)  Text (Left)

    // So the Grid implementation:
    // We can't just have 2 separate long columns because we need row alignment (height matching).
    // "Height should match the image card height".
    // If we have 2 independent columns, heights might desync if content varies.
    // User said: "So each row is: [Text Card] + [Image Card] in the same row height."
    // This implies A GRID of Items, not 2 big columns.
    // It should be 3 Rows. Each Row has 2 Columns.
    // Row 1: [Text] [Image]
    // Row 2: [Text] [Image]
    // Row 3: [Text] [Image]
    // To match "Image Right, Text Left" in RTL:
    // Structure: <div class="grid grid-cols-1 lg:grid-cols-2"> <Image/> <Text/> </div>
    // This works for "Image on Top" in Mobile too.
    // Perfect.

    // So loop through posts 0..2.
    // For each post:
    // <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5 items-stretch">
    //    <ImageCard className="col-start-2 lg:col-start-1?" wait.
    //    RTL Grid: Col 1 is Right. Col 2 is Left.
    //    We want Image on Right (Col 1). Text on Left (Col 2).
    //    So <Image> comes first in DOM?
    //    RTL Grid auto-placement: 1st child -> Right. 2nd child -> Left.
    //    So <Image> then <Text>.
    //    Mobile: <Image> then <Text> -> Image on Top.
    //    Perfect.

    return (
        <section className="relative w-full py-20 bg-[#0B0B0B] overflow-hidden">
            {/* Background Gradients/Grid */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>
                {/* Glows */}
                <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-64 h-96 bg-primary-900/20 blur-[100px] rounded-full"></div>
                <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-64 h-96 bg-primary-900/20 blur-[100px] rounded-full"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 max-w-[1200px]">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                    {/* Right Side (Title) - In RTL this aligns Right naturally via flex-row */}
                    {/* Wait, flex-row in RTL: Start is Right. Items: [First] [Second]. */}
                    {/* First item is Right. Second item is Left. */}
                    {/* We want Title on Right, Button on Left. */}
                    {/* So Title Block must be FIRST child. Button Block must be SECOND child. */}

                    {/* Title Block */}
                    <div className="text-right flex flex-col items-end">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ff7a00]/10 border border-[#ff7a00]/25 text-[#ff7a00] text-sm mb-3">
                            <span className="font-bold">مميز</span>
                        </div>
                        <h2 className="text-4xl md:text-[44px] font-extrabold text-white mb-2 leading-tight">
                            مقالات مختارة
                        </h2>
                        <p className="text-white/65 text-base">
                            محتوى منتقى بعناية لأجلك
                        </p>
                    </div>

                    {/* Left Side (Button) */}
                    <div>
                        <Link to="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff7a00]/10 border border-[#ff7a00]/25 text-[#ff7a00] hover:bg-[#ff7a00]/20 transition-colors font-medium text-sm">
                            <span>عرض الكل</span>
                            {/* Arrow: In RTL points Left. In LTR points Right. */}
                            {/* Lucide ArrowRight -> Points Right. */}
                            {/* If rtl, we want arrow pointing Left. */}
                            {/* User said: "Keep RTL arrow direction exactly as screenshot" */}
                            {/* Usually "View All ->" implies direction of movement. In RTL "<- View All". */}
                            {/* We can use css rtl:rotate-180 */}
                            <ArrowLeft className="w-4 h-4 rtl:block hidden" />
                            <ArrowRight className="w-4 h-4 rtl:hidden block" />
                        </Link>
                    </div>
                </div>

                {/* Grid Layout */}
                <div className="flex flex-col gap-5">
                    {featuredPosts.map((post) => (
                        <div key={post.id} className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:h-[220px]">
                            {/* Image Card (Right in RTL, First in DOM) */}
                            <div className="relative group overflow-hidden rounded-[18px] bg-dark-card border border-white/5 h-[220px] lg:h-auto lg:order-1 order-1">
                                <img
                                    src={post.coverImage}
                                    alt={post.title[lang]}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                {/* Badge */}
                                <div className="absolute top-4 right-4 bg-[#ff7a00] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                    {/* Usually category or featured */}
                                    مميز
                                </div>
                            </div>

                            {/* Text Card (Left in RTL, Second in DOM) */}
                            <div className="bg-[#141414] border border-white/6 rounded-[18px] p-6 lg:p-7 flex flex-col justify-between h-[220px] lg:h-auto lg:order-2 order-2">
                                <div>
                                    <div className="flex items-center justify-end gap-3 text-white/45 text-xs mb-3">
                                        <div className="flex items-center gap-1">
                                            <span>{post.readTime} دقائق قراءة</span>
                                            <Clock className="w-3 h-3" />
                                        </div>
                                        <div className="w-1 h-1 rounded-full bg-white/20"></div>
                                        <div className="flex items-center gap-1">
                                            <span>{new Date(post.publishedAt).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US')}</span>
                                            <Calendar className="w-3 h-3" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl md:text-[22px] font-bold text-white mb-2 line-clamp-2 leading-snug hover:text-primary transition-colors cursor-pointer">
                                        <Link to={`/blog/${post.slug}`}>
                                            {post.title[lang]}
                                        </Link>
                                    </h3>
                                    <p className="text-white/60 text-sm line-clamp-2 md:line-clamp-2 leading-relaxed">
                                        {post.excerpt[lang]}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex items-center gap-3">
                                        <img src={post.author.avatar} alt={post.author.name[lang]} className="w-8 h-8 rounded-full object-cover" />
                                        <div className="flex flex-col text-right">
                                            <span className="text-white text-xs font-bold">{post.author.name[lang]}</span>
                                            <span className="text-white/45 text-[10px]">{post.author.role[lang]}</span>
                                        </div>
                                    </div>

                                    <Link to={`/blog/${post.slug}`} className="text-[#ff7a00] text-sm font-bold flex items-center gap-1 hover:brightness-110 transition-all">
                                        اقرأ المقال
                                        <ArrowLeft className="w-3.5 h-3.5 rtl:block hidden" />
                                        <ArrowRight className="w-3.5 h-3.5 rtl:hidden block" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
