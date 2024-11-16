import {Layout} from "@/components/custom/layout"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {toast} from "sonner"
import {z} from "zod"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {Button} from "@/components/custom/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Progress} from "@/components/ui/progress"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";

import frame1 from '@/assets/frame1.svg';
import frame2 from '@/assets/frame2.svg';
import frame3 from '@/assets/frame3.svg';
import {BubbleChat} from "flowise-embed-react";
import axios from 'axios';
import {useEffect, useState} from "react";

const FormSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    image: z.instanceof(FileList).optional(),
    description: z.string(),
    region: z.string().optional(),
})

export default function Search() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            image: undefined,
            description: "",
            region: "",
        },
    })

    const [isWaitingForSet, setIsWaitingForSet] = useState(false);
    const [progress, setProgress] = useState(0)


    useEffect(() => {
        if (isWaitingForSet) {
            setProgress(20);
        }
    }, [isWaitingForSet]);

    useEffect(() => {
        if (progress < 100) {
            const timer = setTimeout(() => {
                setProgress(prevProgress => prevProgress + 1);
            }, 50);

            return () => clearTimeout(timer);
        }
    }, [progress]);

    const imageRef = form.register("image");

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        const formData = new FormData();
        formData.append("title", data.title);
        // @ts-expect-error Array
        formData.append("image", data.image[0]);
        formData.append("description", data.description);

        axios.post("http://192.168.0.150:3000/inputs", formData).then(() => {
            setIsWaitingForSet(true);
        }).catch(() => {
            toast("Error with searching data. Backend problem.")
        })

        //toast("Error with searching data. Backend problem.", {
        //                 description: "Sunday, December 03, 2023 at 9:00 AM",
        //                 action: {
        //                     label: "Undo",
        //                     onClick: () => console.log("Undo"),
        //                 },
        //             })
    }

    const getProgressName = () => {
        if (progress > 0 && progress <= 20) return "Uploading data...";
        if (progress > 20 && progress <= 40) return "Scanning image...";
        if (progress > 40 && progress <= 60) return "Comparing data...";
        if (progress > 60 && progress <= 100) return "Finishing...";
    }

    return (
        <Layout>
            <Layout.Header>
                <div>haha</div>
            </Layout.Header>

            <Layout.Body>
                <div className="grid grid-cols-5 gap-10">
                    <Card className="col-span-3 relative">
                        {isWaitingForSet ? <div
                            className="absolute h-full  w-full bg-gradient-to-r from-[#0072F5] to-[#5EA2EF] opacity-80 rounded-[11px]">
                            <div
                                className="absolute space-y-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-2/3 ">
                                <Progress value={progress} className="w-full"/>
                                <div>
                                    {getProgressName()}
                                </div>
                            </div>
                        </div> : null}
                        <CardHeader className="px-6 pt-6 pb-3">
                            <CardTitle
                                className="tracking-tight inline font-semibold from-[#5EA2EF] to-[#0072F5]  bg-clip-text text-transparent bg-gradient-to-b">Search</CardTitle>
                            <CardDescription>Find your brand's products on various local marketplaces.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Gucci, Prada or any other brand" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    Enter your brand name
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="image"
                                        render={() => (
                                            <FormItem>
                                                <FormLabel>Image</FormLabel>
                                                <FormControl>
                                                    <Input type="file" placeholder="shadcn" {...imageRef}
                                                           className="flex h-9 w-full rounded-md border border-input
                                                    bg-transparent px-3 py-1 text-base shadow-sm transition-colors
                                                    file:border-0 file:bg-transparent file:text-sm file:font-medium
                                                    file:text-foreground placeholder:text-muted-foreground
                                                    focus-visible:outline-none focus-visible:ring-1
                                                    focus-visible:ring-ring disabled:cursor-not-allowed
                                                    disabled:opacity-50 md:text-sm"/>
                                                </FormControl>
                                                <FormDescription>
                                                    Upload the product image from your brand that you're searching for.
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea {...field}
                                                              placeholder="Brown leather jacked handwritten text"/>
                                                </FormControl>
                                                <FormDescription>
                                                    Provide more details about your product—such as model, color, year
                                                    of
                                                    production, and more
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="region"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Region</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue
                                                                placeholder="Select a region"/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="worldwide">Worldwide</SelectItem>
                                                        <SelectItem value="eu">Europe</SelectItem>
                                                        <SelectItem value="us">United States</SelectItem>
                                                        <SelectItem value="sa">South America</SelectItem>
                                                        <SelectItem value="as">Asia</SelectItem>
                                                        <SelectItem value="au">Australia</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>
                                                    Select your focus region
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex justify-end">
                                        <Button type="submit" className="w-[120px]">Search</Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                    <Card className="col-span-2">
                        <CardHeader className="px-6 pt-6 pb-3">
                            <CardTitle
                                className="tracking-tight inline font-semibold from-[#FF1CF7] to-[#b249f8] bg-clip-text text-transparent bg-gradient-to-b">How
                                it works?</CardTitle>
                            <CardDescription>Here is example how to make better search of your product on local
                                marketplaces.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div className="flex flex-col space-y-4">
                                <div className="flex items-start">
                                    <div className="relative flex items-center justify-center">
                                        <div className=
                                                 "flex h-8 w-8 items-center justify-center rounded-full border-2">

                                            <span>1</span>
                                        </div>
                                    </div>
                                    <div className="ml-4 flex flex-col">
                                        <div className="text-sm font-medium">
                                            Define what are you looking for!
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Clearly specify the brand, model, or category you are searching for across
                                            online marketplaces. Attach image of product if you have it.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="relative flex items-center justify-center">
                                        <div className=
                                                 "flex h-8 w-8 items-center justify-center rounded-full border-2">

                                            <span>2</span>
                                        </div>
                                    </div>
                                    <div className="ml-4 flex flex-col">
                                        <div className="text-sm font-medium">
                                            Search Mechanism (Crawler + AI Filtering):
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            The tool employs specialized crawlers and AI algorithms to filter results
                                            and score listings for relevance.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="relative flex items-center justify-center">
                                        <div className=
                                                 "flex h-8 w-8 items-center justify-center rounded-full border-2">

                                            <span>3</span>
                                        </div>
                                    </div>
                                    <div className="ml-4 flex flex-col">
                                        <div className="text-sm font-medium">
                                            Comparison by Image/Text
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Utilize image or text-based comparison to find the most closely matched
                                            products. This enables a detailed side-by-side evaluation to ensure a
                                            precise match.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-center mt-4">
                                <div className="grid grid-cols-3 items-center gap-x-8 w-2/3">
                                    <img src={frame1} alt=""/>
                                    <img src={frame2} alt=""/>
                                    <img src={frame3} alt=""/>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <BubbleChat chatflowid="28907114-56bd-4f75-be95-6aa7651faf2e" apiHost="http://192.168.0.7:3000"/>
            </Layout.Body>
        </Layout>
    )
}