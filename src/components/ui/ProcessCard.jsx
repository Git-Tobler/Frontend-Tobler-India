<div className="group flex gap-8">

    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-tobler-blue text-xl font-bold text-white">
        {number}
    </div>

    <div className="flex-1 rounded-card border border-tobler-border bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">

        <h3 className="font-display text-2xl">
            {title}
        </h3>

        <p className="mt-4 text-tobler-body leading-8">
            {description}
        </p>

    </div>

</div>